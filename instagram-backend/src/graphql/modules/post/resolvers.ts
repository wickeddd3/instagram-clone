import { prisma } from "@/lib/prisma";
import type { GraphQLContext } from "@/graphql/context";

export interface PostParent {
  id: string;
  _count?: { likes?: number; comments?: number };
  // When the post came from a list query, the service already loaded the
  // viewer's own like/save rows (see buildPostInclude). Their presence answers
  // isLiked/isSaved without another round-trip — this is what avoids the N+1.
  likes?: { id: string }[];
  savedBy?: { id: string }[];
}

export const PostResolvers = {
  // 'parent' is the Post object returned from Prisma
  likesCount: (parent: PostParent) => parent._count?.likes ?? 0,
  commentsCount: (parent: PostParent) => parent._count?.comments ?? 0,
  // Check if the current user liked this specific post
  isLiked: async (parent: PostParent, _args: unknown, context: GraphQLContext) => {
    // Fast path: the list query pre-scoped the viewer's likes into the payload.
    if (parent.likes) return parent.likes.length > 0;
    // Fallback for posts fetched without the include (e.g. a freshly created post).
    if (!context.userId) return false;
    const like = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: context.userId,
          postId: parent.id,
        },
      },
    });

    return !!like;
  },
  isSaved: async (parent: PostParent, _args: unknown, context: GraphQLContext) => {
    if (parent.savedBy) return parent.savedBy.length > 0;
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
