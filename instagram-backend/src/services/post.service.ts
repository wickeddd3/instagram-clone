import type { PrismaClient } from "@/prisma/client";
import { Prisma } from "@/prisma/client";

// Per-viewer include shared by every list query. Folding the viewer's own
// like/save rows into the same query is what keeps `Post.isLiked`/`Post.isSaved`
// from firing a `findUnique` per post (an N+1 across the whole page). Typing it
// with `satisfies` keeps Prisma's payload inference working so downstream
// `.author.followers`/`.likes`/`.savedBy`/`._count` access stays type-safe.
const buildPostInclude = (viewerId: string) =>
  ({
    author: {
      include: {
        followers: {
          where: { followerId: viewerId },
          select: { followerId: true },
        },
      },
    },
    media: {
      orderBy: { index: "asc" }, // Ensure images stay in the order they were uploaded
    },
    // Only the viewer's own like/save (if any) — presence means isLiked/isSaved.
    likes: { where: { userId: viewerId }, select: { id: true } },
    savedBy: { where: { userId: viewerId }, select: { id: true } },
    _count: { select: { comments: true, likes: true } },
  }) satisfies Prisma.PostInclude;

type PostWithRelations = Prisma.PostGetPayload<{
  include: ReturnType<typeof buildPostInclude>;
}>;

export class PostService {
  constructor(private prisma: PrismaClient) {}

  // Derive the per-viewer `isFollowing` flag from the scoped `followers` rows.
  // `isLiked`/`isSaved` are read off `likes`/`savedBy` by the Post field
  // resolvers, so they don't need to be mapped here.
  private attachViewerState(post: PostWithRelations, viewerId: string) {
    return {
      ...post,
      isFollowing: post.author.followers.length > 0 || post.author.id === viewerId,
    };
  }

  private async getPaginatedPosts(args: Prisma.PostFindManyArgs, limit: number, viewerId: string) {
    const rawPosts = await this.prisma.post.findMany({
      ...args,
      take: limit,
      include: buildPostInclude(viewerId),
    });

    const posts = rawPosts.map((post) => this.attachViewerState(post, viewerId));
    const hasMore = posts.length === limit;
    const nextCursor = hasMore ? posts[posts.length - 1]?.id : null;

    return { posts, hasMore, nextCursor };
  }

  private async getFollowingIds(userId: string) {
    const following = await this.prisma.follow.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    });
    const followingIds = following.map((f) => f.followingId);

    return followingIds;
  }

  async getFeedPosts(userId: string, cursor?: string, limit = 5) {
    // 1. Get IDs of people the user follows
    const followingIds = await this.getFollowingIds(userId);
    const includeIds = [...followingIds, userId];

    let followedPosts: PostWithRelations[] = [];
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
        include: buildPostInclude(userId),
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
        include: buildPostInclude(userId),
      });

      combinedPosts = [...combinedPosts, ...suggestedPosts];
    }

    // 5. Map the combined results to include isFollowing
    const posts = combinedPosts.map((post) => this.attachViewerState(post, userId));

    // 6. Calculate pagination metadata based on the FINAL combined list
    const hasMore = posts.length === limit;
    const nextCursor = hasMore ? posts[posts.length - 1]?.id : null;

    return { posts, hasMore, nextCursor };
  }

  async getExplorePosts(viewerId: string, cursor?: string, limit = 9) {
    // Exclude people the viewer already follows (and themselves) from discovery.
    const followingIds = await this.getFollowingIds(viewerId);
    const excludeIds = [...followingIds, viewerId];

    return this.getPaginatedPosts(
      {
        where: {
          authorId: { notIn: excludeIds },
        },
        orderBy: { createdAt: "desc" },
        ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      },
      limit,
      viewerId,
    );
  }

  getProfilePosts(viewerId: string, profileId: string, cursor?: string, limit = 5) {
    return this.getPaginatedPosts(
      {
        where: { authorId: profileId },
        orderBy: { createdAt: "desc" },
        ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      },
      limit,
      viewerId,
    );
  }

  // Saved posts are private, so `viewerId` is always the owner — the caller
  // (resolver) enforces that the requested profile matches the authenticated user.
  async getSavedPosts(viewerId: string, cursor?: string, limit = 10) {
    const savedRecords = await this.prisma.savedPost.findMany({
      where: { userId: viewerId },
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        post: { include: buildPostInclude(viewerId) },
      },
      ...(cursor && {
        cursor: { id: cursor },
        skip: 1,
      }),
    });

    const posts = savedRecords.map((record) => this.attachViewerState(record.post, viewerId));
    const hasMore = savedRecords.length === limit;
    const nextCursor = hasMore ? savedRecords[savedRecords.length - 1]?.id : null;

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
      likesCount: post?._count.likes ?? 0,
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
