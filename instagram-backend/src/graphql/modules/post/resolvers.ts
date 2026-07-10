import { prisma } from "@/lib/prisma";
import type { GraphQLContext } from "@/graphql/context";

export interface PostParent {
  id: string;
  _count?: { likes?: number; comments?: number };
}

export const PostResolvers = {
  // 'parent' is the Post object returned from Prisma
  likesCount: (parent: PostParent) => parent._count?.likes ?? 0,
  commentsCount: (parent: PostParent) => parent._count?.comments ?? 0,
  // Check if the current user liked this specific post
  isLiked: async (parent: PostParent, _args: unknown, context: GraphQLContext) => {
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
  isSaved: async (parent: PostParent, _args: unknown, context: GraphQLContext) => {
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
