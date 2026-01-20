import { prisma } from "../../../lib/prisma";

export const CommentResolvers = {
  likesCount: (parent: any) => parent._count?.likes ?? 0,
  repliesCount: (parent: any) => parent._count?.replies ?? 0,
  // Check if the current user liked this specific comment
  isLiked: async (parent: any, _args: any, context: any) => {
    // If no user is logged in, they can't have liked it
    if (!context.userId) return false;
    // Check the 'likes' table for a match
    const like = await prisma.like.findUnique({
      where: {
        userId_commentId: {
          userId: context.userId,
          commentId: parent.id,
        },
      },
    });

    // If a record exists, return true (comment is liked)
    return !!like;
  },
};
