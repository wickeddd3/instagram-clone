import { prisma } from "../../../lib/prisma";

export const PostResolvers = {
  // 'parent' is the Post object returned from Prisma
  likesCount: (parent: any) => parent._count?.likes ?? 0,
  commentsCount: (parent: any) => parent._count?.comments ?? 0,
  // Check if the current user liked this specific post
  isLiked: async (parent: any, _args: any, context: any) => {
    // If no user is logged in, they can't have liked it
    if (!context.userId) return false;
    // Check the 'likes' table for a match
    const like = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: context.userId,
          postId: parent.id,
        },
      },
    });

    // If a record exists, return true (post is liked)
    return !!like;
  },
  isSaved: async (parent: any, _args: any, context: any) => {
    if (!context.userId) return false;

    const save = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId: context.userId,
          postId: parent.id,
        },
      },
    });
    return !!save;
  },
};
