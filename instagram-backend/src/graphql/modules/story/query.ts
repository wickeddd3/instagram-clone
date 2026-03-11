export const StoryQuery = {
  getStoriesFeed: (_parent: any, { profileId }: any, { services }: any) => {
    return services.story.getStoriesFeed(profileId);
  },

  getStoryViewers: async (
    _parent: any,
    { storyId }: any,
    { services }: any,
  ) => {
    return services.story.getStoryViewers(storyId);
  },
};
