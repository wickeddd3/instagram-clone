import type { GraphQLContext } from "@/graphql/context";

export const CommentQuery = {
  getComments: async (
    _parent: unknown,
    { postId, parentId, cursor, limit = 10 }: { postId: string; parentId?: string; cursor?: string; limit?: number },
    { services }: GraphQLContext,
  ) => {
    return services.comment.getComments({ postId, parentId, cursor, limit });
  },
};
