import type { GraphQLContext } from "@/graphql/context";
import { unauthenticatedError } from "@/graphql/errors";

export const CommentMutation = {
  addComment: async (
    _parent: unknown,
    {
      postId,
      text,
      parentId = null,
    }: {
      postId: string;
      text: string;
      parentId?: string | null;
    },
    { userId, services }: GraphQLContext,
  ) => {
    if (!userId) throw unauthenticatedError();

    return services.comment.addComment(userId, { postId, text, parentId });
  },

  toggleCommentLike: async (
    _parent: unknown,
    { commentId }: { commentId: string },
    { userId, services }: GraphQLContext,
  ) => {
    if (!userId) throw unauthenticatedError();

    return services.comment.toggleLike(userId, commentId);
  },
};
