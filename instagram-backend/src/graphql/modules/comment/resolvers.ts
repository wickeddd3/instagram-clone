import { prisma } from "../../../lib/prisma";
import type { GraphQLContext } from "../../context";

export interface CommentParent {
  id: string;
  _count?: { likes?: number; replies?: number };
}

export const CommentResolvers = {
  likesCount: (parent: CommentParent) => parent._count?.likes ?? 0,
  repliesCount: (parent: CommentParent) => parent._count?.replies ?? 0,
  // Check if the current user liked this specific comment
  isLiked: async (parent: CommentParent, _args: unknown, context: GraphQLContext) => {
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
