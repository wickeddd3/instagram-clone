import type { GraphQLContext } from "../../context";

export const StoryQuery = {
  getStoriesFeed: (_parent: unknown, { profileId }: { profileId: string }, { services }: GraphQLContext) => {
    return services.story.getStoriesFeed(profileId);
  },

  getStoryViewers: async (_parent: unknown, { storyId }: { storyId: string }, { services }: GraphQLContext) => {
    return services.story.getStoryViewers(storyId);
  },
};
