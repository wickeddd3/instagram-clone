import type { GraphQLContext } from "../../context";

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
    if (!userId) throw new Error("Unauthorized");

    return services.comment.addComment(userId, { postId, text, parentId });
  },

  toggleCommentLike: async (
    _parent: unknown,
    { commentId }: { commentId: string },
    { userId, services }: GraphQLContext,
  ) => {
    if (!userId) throw new Error("Unauthorized");

    return services.comment.toggleLike(userId, commentId);
  },
};
