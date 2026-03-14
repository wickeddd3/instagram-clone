export const PostQuery = {
  getFeedPosts: (
    _parent: any,
    {
      profileId,
      cursor,
      limit = 5,
    }: { profileId: string; cursor: string; limit: number },
    { userId, services }: any,
  ) => {
    if (!userId) return { posts: [], hasMore: false, nextCursor: null };

    return services.post.getFeedPosts(userId, cursor, limit);
  },

  getExplorePosts: async (
    _parent: any,
    {
      profileId,
      cursor,
      limit = 9,
    }: { profileId: string; cursor: string; limit: number },
    { userId, services }: any,
  ) => {
    if (!userId) return { posts: [], hasMore: false, nextCursor: null };

    return services.post.getExplorePosts(userId, cursor, limit);
  },

  getProfilePosts: async (
    _parent: any,
    { profileId, cursor, limit = 5 }: any,
    { services }: any,
  ) => {
    if (!profileId) return { posts: [], hasMore: false, nextCursor: null };

    return services.post.getProfilePosts(profileId, cursor, limit);
  },

  getSavedPosts: async (
    _parent: any,
    { profileId, cursor, limit = 10 }: any,
    { services }: any,
  ) => {
    return services.post.getSavedPosts(profileId, cursor, limit);
  },
};
