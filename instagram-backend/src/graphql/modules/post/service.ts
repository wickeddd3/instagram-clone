import { PrismaClient } from "@prisma/client/extension";
import { Prisma } from "../../../client";

export class PostService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Internal helper to standardize pagination across different post queries
   */
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

  async getFeedPosts(userId: string, cursor?: string, limit = 5) {
    // 1. Get IDs of people the user follows
    const followingIds = await this.getFollowingIds(userId);
    const includeIds = [...followingIds, userId];

    // 2. Query posts from those users + the user's own posts
    return this.getPaginatedPosts(
      {
        where: { authorId: { in: includeIds } },
        orderBy: { createdAt: "desc" },
        ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      },
      limit,
    );
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
    data: { imageUrl: string; caption?: string; location?: string },
  ) {
    return await this.prisma.post.create({
      data: { ...data, authorId: userId },
      include: { author: true },
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
