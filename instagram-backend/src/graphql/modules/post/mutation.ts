import { prisma } from "../../../lib/prisma";

export const PostMutation = {
  createPost: async (
    _parent: any,
    { imageUrl, caption, location }: any,
    context: any,
  ) => {
    if (!context.userId) {
      throw new Error("Unauthorized: You must be logged in.");
    }
    // 'context.userId' comes from Auth middleware/Supabase JWT
    return await prisma.post.create({
      data: {
        imageUrl,
        caption,
        location,
        authorId: context.userId,
      },
      include: { author: true },
    });
  },
  togglePostSave: async (
    _parent: any,
    { postId }: { postId: string },
    context: any,
  ) => {
    if (!context.userId) {
      throw new Error("Unauthorized: You must be logged in.");
    }

    const userId = context.userId;

    const existingSave = await prisma.savedPost.findUnique({
      where: { userId_postId: { userId, postId } },
    });

    if (existingSave) {
      await prisma.savedPost.delete({
        where: { id: existingSave.id },
      });
    } else {
      await prisma.savedPost.create({
        data: { userId, postId },
      });
    }

    return {
      id: postId,
      isSaved: !existingSave,
    };
  },
  togglePostLike: async (
    _parent: any,
    { postId }: { postId: string },
    context: any,
  ) => {
    const userId = context.userId;

    // Check if like exists
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: { userId, postId },
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: { id: existingLike.id },
      });
    } else {
      await prisma.like.create({
        data: { userId, postId },
      });
    }

    // Fetch the updated post to get the fresh count
    const updatedPost = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        _count: { select: { likes: true } },
      },
    });

    return {
      id: postId,
      isLiked: !existingLike, // If it existed, it's now false. If not, true.
      likesCount: updatedPost?._count.likes || 0,
    };
  },
};
