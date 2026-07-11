import type { GraphQLContext } from "@/graphql/context";
import { unauthenticatedError } from "@/graphql/errors";

export const StoryMutation = {
  createStory: (
    _parent: unknown,
    { mediaUrl, mediaType }: { mediaUrl: string; mediaType: string },
    { userId, services }: GraphQLContext,
  ) => {
    if (!userId) throw unauthenticatedError();

    return services.story.createStory(userId, { mediaUrl, mediaType });
  },

  viewStory: (_parent: unknown, { storyId }: { storyId: string }, { userId, services }: GraphQLContext) => {
    if (!userId) return null;
    return services.story.viewStory(storyId, userId);
  },
};
