export const StoryMutation = {
  createStory: (
    _parent: any,
    { mediaUrl, mediaType }: any,
    { userId, services }: any,
  ) => {
    if (!userId) throw new Error("Unauthorized");

    return services.story.createStory(userId, { mediaUrl, mediaType });
  },

  viewStory: (_parent: any, { storyId }: any, { userId, services }: any) => {
    return services.story.viewStory(storyId, userId);
  },
};
