import { PrismaClient } from "@prisma/client/extension";
import { Prisma } from "../../../client";

export class PostService {
  constructor(private prisma: PrismaClient) {}

  private async getPaginatedPosts(
    args: Prisma.PostFindManyArgs,
    limit: number,
  ) {
    const posts = await this.prisma.post.findMany({
      ...args,
      take: limit,
      include: {
        author: true,
        _count: { select: { comments: true, likes: true } },
      },
    });

    const hasMore = posts.length === limit;
    const nextCursor = hasMore ? posts[posts.length - 1]?.id : null;

    return { posts, hasMore, nextCursor };
  }

  private async getFollowingIds(userId: string) {
    const following = await this.prisma.follow.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    });
    const followingIds = following.map((f: any) => f.followingId);

    return followingIds;
  }

  private getPostInclude(userId: string) {
    return {
      author: {
        include: {
          followers: {
            where: { followerId: userId },
            select: { followerId: true },
          },
        },
      },
      media: {
        orderBy: { index: "asc" }, // Ensure images stay in the order they were uploaded
      },
      _count: { select: { comments: true, likes: true } },
    };
  }

  async getFeedPosts(userId: string, cursor?: string, limit = 5) {
    // 1. Get IDs of people the user follows
    const followingIds = await this.getFollowingIds(userId);
    const includeIds = [...followingIds, userId];

    let followedPosts: any[] = [];
    let isPaginatingSuggestions = false;

    // 2. Identify where the cursor is from
    if (cursor) {
      const cursorPost = await this.prisma.post.findUnique({
        where: { id: cursor },
        select: { authorId: true },
      });

      // If the cursor post belongs to someone NOT in our include list,
      // it means we are already in "Suggested Mode"
      if (cursorPost && !includeIds.includes(cursorPost.authorId)) {
        isPaginatingSuggestions = true;
      }
    }

    // 3. Only fetch followed posts if we aren't already deep in suggestions
    if (!isPaginatingSuggestions) {
      // Fetch followed/own posts
      followedPosts = await this.prisma.post.findMany({
        where: { authorId: { in: includeIds } },
        orderBy: { createdAt: "desc" },
        take: limit,
        ...(cursor && { cursor: { id: cursor }, skip: 1 }),
        include: this.getPostInclude(userId),
      });
    }

    let combinedPosts = [...followedPosts];

    // 4. If no posts found (new user) or we hit the end, inject suggestions
    if (combinedPosts.length < limit) {
      const remainingSpace = limit - combinedPosts.length;

      // Logic: Use the cursor for suggestions ONLY if we are already in suggested mode.
      // Otherwise, start from the beginning of suggestions.
      const suggestedCursor = isPaginatingSuggestions ? cursor : undefined;

      const suggestedPosts = await this.prisma.post.findMany({
        where: {
          authorId: { notIn: includeIds },
        },
        orderBy: [
          { likes: { _count: "desc" } },
          { id: "desc" }, // Secondary sort for stable cursor
        ],
        take: remainingSpace,
        ...(suggestedCursor && { cursor: { id: suggestedCursor }, skip: 1 }),
        include: this.getPostInclude(userId),
      });

      combinedPosts = [...combinedPosts, ...suggestedPosts];
    }

    // 5. Map the combined results to include isFollowing
    const posts = combinedPosts.map((post: any) => ({
      ...post,
      isFollowing:
        post.author.followers.length > 0 || post.author.id === userId,
    }));

    // 6. Calculate pagination metadata based on the FINAL combined list
    const hasMore = posts.length === limit;
    const nextCursor = hasMore ? posts[posts.length - 1]?.id : null;

    return { posts, hasMore, nextCursor };
  }

  async getExplorePosts(userId?: string, cursor?: string, limit = 9) {
    let excludeIds: string[] = [];

    if (userId) {
      // 1. Get IDs of people the user already follows + their own ID
      const followingIds = await this.getFollowingIds(userId);
      excludeIds = [...followingIds, userId];
    }

    // 2. Return posts from people NOT in the exclude list
    return this.getPaginatedPosts(
      {
        where: {
          authorId: { notIn: excludeIds },
        },
        orderBy: { createdAt: "desc" },
        ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      },
      limit,
    );
  }

  getProfilePosts(profileId: string, cursor?: string, limit = 5) {
    return this.getPaginatedPosts(
      {
        where: { authorId: profileId },
        orderBy: { createdAt: "desc" },
        ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      },
      limit,
    );
  }

  async getSavedPosts(profileId: string, cursor?: string, limit = 10) {
    const savedRecords = await this.prisma.savedPost.findMany({
      where: { userId: profileId },
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        post: {
          include: {
            author: true,
            _count: { select: { comments: true, likes: true } },
          },
        },
      },
      ...(cursor && {
        cursor: { id: cursor },
        skip: 1,
      }),
    });

    const posts = savedRecords.map((record: any) => record.post);
    const hasMore = savedRecords.length === limit;
    const nextCursor = hasMore
      ? savedRecords[savedRecords.length - 1]?.id
      : null;

    return { posts, hasMore, nextCursor };
  }

  async createPost(
    userId: string,
    data: {
      media: { url: string; type: string }[];
      caption?: string;
      location?: string;
    },
  ) {
    return await this.prisma.post.create({
      data: {
        caption: data.caption,
        location: data.location,
        authorId: userId,
        media: {
          create: data.media.map((item, index) => ({
            url: item.url,
            type: item.type,
            index: index, // Maintain the order of upload
          })),
        },
      },
      include: {
        author: true,
        media: { orderBy: { index: "asc" } }, // Always return in order
        _count: { select: { comments: true, likes: true } },
      },
    });
  }

  async toggleLike(userId: string, postId: string) {
    const existing = await this.prisma.like.findUnique({
      where: { userId_postId: { userId, postId } },
    });

    if (existing) {
      await this.prisma.like.delete({ where: { id: existing.id } });
    } else {
      await this.prisma.like.create({ data: { userId, postId } });
    }

    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      include: { _count: { select: { likes: true } } },
    });

    return {
      id: postId,
      isLiked: !existing,
      likesCount: post?._count.likes || 0,
    };
  }

  async toggleSave(userId: string, postId: string) {
    const existing = await this.prisma.savedPost.findUnique({
      where: { userId_postId: { userId, postId } },
    });

    if (existing) {
      await this.prisma.savedPost.delete({ where: { id: existing.id } });
    } else {
      await this.prisma.savedPost.create({ data: { userId, postId } });
    }

    return { id: postId, isSaved: !existing };
  }
}
