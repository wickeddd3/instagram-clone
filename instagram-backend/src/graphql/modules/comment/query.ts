export const CommentQuery = {
  getComments: async (
    _parent: any,
    {
      postId,
      parentId,
      cursor,
      limit = 10,
    }: { postId: string; parentId?: string; cursor?: string; limit: number },
    { services }: any,
  ) => {
    return services.comment.getComments({ postId, parentId, cursor, limit });
  },
};
