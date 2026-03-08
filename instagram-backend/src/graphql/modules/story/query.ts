export const StoryQuery = {
  getStoriesFeed: (_parent: any, { profileId }: any, { services }: any) => {
    return services.story.getStoriesFeed(profileId);
  },
};
