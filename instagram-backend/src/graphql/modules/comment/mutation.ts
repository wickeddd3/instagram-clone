import type { GraphQLContext } from "@/graphql/context";
import { unauthenticatedError } from "@/graphql/errors";
import { validateInput } from "@/graphql/validation";
import { addCommentSchema } from "./schema";

export const CommentMutation = {
  addComment: async (
    _parent: unknown,
    args: {
      postId: string;
      text: string;
      parentId?: string | null;
    },
    { userId, services }: GraphQLContext,
  ) => {
    if (!userId) throw unauthenticatedError();

    const { postId, text, parentId = null } = validateInput(addCommentSchema, args);

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
