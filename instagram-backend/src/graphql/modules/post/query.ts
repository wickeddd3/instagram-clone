import { Prisma } from "../../../client";
import { prisma } from "../../../lib/prisma";

export const PostQuery = {
  getFeedPosts: async (
    _parent: any,
    { cursor, limit = 5 }: { cursor: string; limit: number },
    context: any,
  ) => {
    // Base query options
    const queryOptions: Prisma.PostFindManyArgs = {
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
        _count: { select: { comments: true, likes: true } },
      },
    };

    // Only add cursor and skip if a cursor exists
    if (cursor && cursor !== null) {
      queryOptions.cursor = { id: cursor };
      queryOptions.skip = 1; // Skip the actual cursor record to avoid duplicates
    }

    const posts = await prisma.post.findMany(queryOptions);
    const hasMore = posts.length === limit; // if posts length exactly the limit, there might be more
    const nextCursor = hasMore ? posts[posts.length - 1]?.id : null;

    return {
      posts,
      hasMore,
      nextCursor,
    };
  },
  getExplorePosts: async (
    _parent: any,
    { cursor, limit = 9 }: { cursor: string; limit: number },
    context: any,
  ) => {
    // TODO: Exclude user's own posts and people user follow
    // Base query options
    const queryOptions: Prisma.PostFindManyArgs = {
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
        _count: { select: { comments: true, likes: true } },
      },
    };

    // Only add cursor and skip if a cursor exists
    if (cursor && cursor !== null) {
      queryOptions.cursor = { id: cursor };
      queryOptions.skip = 1; // Skip the actual cursor record to avoid duplicates
    }

    const posts = await prisma.post.findMany(queryOptions);
    const hasMore = posts.length === limit; // if posts length exactly the limit, there might be more
    const nextCursor = hasMore ? posts[posts.length - 1]?.id : null;

    return {
      posts,
      hasMore,
      nextCursor,
    };
  },
  getProfilePosts: async (
    _parent: any,
    { profileId, cursor, limit = 10 }: any,
  ) => {
    // Base query options
    const queryOptions: Prisma.PostFindManyArgs = {
      where: { authorId: profileId },
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
        _count: { select: { comments: true, likes: true } },
      },
    };

    // Only add cursor and skip if a cursor exists
    if (cursor && cursor !== null) {
      queryOptions.cursor = { id: cursor };
      queryOptions.skip = 1; // Skip the actual cursor record to avoid duplicates
    }

    const posts = await prisma.post.findMany(queryOptions);
    const hasMore = posts.length === limit; // if posts length exactly the limit, there might be more
    const nextCursor = hasMore ? posts[posts.length - 1]?.id : null;

    return {
      posts,
      hasMore,
      nextCursor,
    };
  },
  getSavedPosts: async (
    _parent: any,
    { cursor, limit = 10 }: any,
    context: any,
  ) => {
    if (!context.userId)
      throw new Error("Unauthorized: You must be logged in.");

    // Base query options
    const queryOptions: Prisma.SavedPostFindManyArgs = {
      where: { userId: context.userId },
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
    };

    // Only add cursor and skip if a cursor exists
    if (cursor && cursor !== null) {
      queryOptions.cursor = { id: cursor };
      queryOptions.skip = 1; // Skip the actual cursor record to avoid duplicates
    }

    const savedRecords = (await prisma.savedPost.findMany(
      queryOptions,
    )) as any[];
    // Flatten the result: return the Post objects directly
    const posts = savedRecords.map((record: any) => record.post);
    const hasMore = savedRecords.length === limit; // if posts length exactly the limit, there might be more
    const nextCursor = hasMore
      ? savedRecords[savedRecords.length - 1]?.id
      : null;

    return {
      posts,
      hasMore,
      nextCursor,
    };
  },
};
