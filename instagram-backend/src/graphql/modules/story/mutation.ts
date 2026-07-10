import type { GraphQLContext } from "@/graphql/context";

export const StoryMutation = {
  createStory: (
    _parent: unknown,
    { mediaUrl, mediaType }: { mediaUrl: string; mediaType: string },
    { userId, services }: GraphQLContext,
  ) => {
    if (!userId) throw new Error("Unauthorized");

    return services.story.createStory(userId, { mediaUrl, mediaType });
  },

  viewStory: (_parent: unknown, { storyId }: { storyId: string }, { userId, services }: GraphQLContext) => {
    if (!userId) return null;
    return services.story.viewStory(storyId, userId);
  },
};
