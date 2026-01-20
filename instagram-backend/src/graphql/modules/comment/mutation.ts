import { prisma } from "../../../lib/prisma";

export const CommentMutation = {
  addComment: async (
    _parent: any,
    { postId, text, parentId }: any,
    context: any,
  ) => {
    if (!context.userId) {
      throw new Error("Unauthorized: You must be logged in.");
    }

    return await prisma.comment.create({
      data: {
        text,
        postId,
        authorId: context.userId,
        parentId: parentId || null, // If parentId exists, it's a reply
      },
      include: { author: true },
    });
  },
  toggleCommentLike: async (
    _parent: any,
    { commentId }: { commentId: string },
    context: any,
  ) => {
    const userId = context.userId;

    // Check if like exists
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_commentId: { userId, commentId },
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: { id: existingLike.id },
      });
      return false; // Unliked
    } else {
      await prisma.like.create({
        data: { userId, commentId },
      });
      return true; // Liked
    }
  },
};
