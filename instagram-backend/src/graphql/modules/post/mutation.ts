import type { GraphQLContext } from "@/graphql/context";
import { unauthenticatedError } from "@/graphql/errors";

export const PostMutation = {
  createPost: (
    _parent: unknown,
    {
      media,
      caption = "",
      location = "",
    }: {
      media: { url: string; type: string }[];
      caption?: string;
      location?: string;
    },
    { userId, services }: GraphQLContext,
  ) => {
    if (!userId) throw unauthenticatedError();

    return services.post.createPost(userId, { media, caption, location });
  },

  togglePostSave: (_parent: unknown, { postId }: { postId: string }, { userId, services }: GraphQLContext) => {
    if (!userId) throw unauthenticatedError();

    return services.post.toggleSave(userId, postId);
  },

  togglePostLike: (_parent: unknown, { postId }: { postId: string }, { userId, services }: GraphQLContext) => {
    if (!userId) throw unauthenticatedError();

    return services.post.toggleLike(userId, postId);
  },
};
