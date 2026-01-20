import { Prisma } from "../../../client";
import { prisma } from "../../../lib/prisma";

export const CommentQuery = {
  getComments: async (
    _parent: any,
    {
      postId,
      parentId,
      cursor,
      limit = 10,
    }: { postId: string; parentId?: string; cursor?: string; limit: number },
  ) => {
    // Base query options
    const queryOptions: Prisma.CommentFindManyArgs = {
      where: {
        postId,
        parentId: parentId || null, // Only fetch top-level comments initially
      },
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
        _count: { select: { replies: true } },
      },
    };

    // Only add cursor and skip if a cursor exists
    if (cursor && cursor !== null) {
      queryOptions.cursor = { id: cursor };
      queryOptions.skip = 1; // Skip the actual cursor record to avoid duplicates
    }

    const comments = await prisma.comment.findMany(queryOptions);
    const hasMore = comments.length === limit; // if posts length exactly the limit, there might be more
    const nextCursor = hasMore ? comments[comments.length - 1]?.id : null;

    return {
      comments,
      hasMore,
      nextCursor,
    };
  },
};
