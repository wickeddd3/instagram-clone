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
    } else {
      await prisma.like.create({
        data: { userId, commentId },
      });
    }

    // Fetch the updated post to get the fresh count
    const updatedComment = await prisma.comment.findUnique({
      where: { id: commentId },
      include: {
        _count: { select: { likes: true } },
      },
    });

    return {
      id: commentId,
      isLiked: !existingLike, // If it existed, it's now false. If not, true.
      likesCount: updatedComment?._count.likes || 0,
    };
  },
};
