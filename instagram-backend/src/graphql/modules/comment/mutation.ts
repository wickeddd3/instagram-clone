export const CommentMutation = {
  addComment: async (
    _parent: any,
    { postId, text, parentId = null }: any,
    { userId, services }: any,
  ) => {
    if (!userId) throw new Error("Unauthorized");

    return services.comment.addComment(userId, { postId, text, parentId });
  },

  toggleCommentLike: async (
    _parent: any,
    { commentId }: { commentId: string },
    { userId, services }: any,
  ) => {
    if (!userId) throw new Error("Unauthorized");

    return services.comment.toggleLike(userId, commentId);
  },
};
