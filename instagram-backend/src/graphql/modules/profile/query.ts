export const ProfileQuery = {
  checkAvailability: (
    _parent: any,
    { email, username }: { email: string; username: string },
    { services }: any,
  ) => {
    return services.profile.checkAvailability(email, username);
  },

  getProfile: (
    _parent: any,
    { username }: { username: string },
    { services }: any,
  ) => {
    return services.profile.getProfile({ username });
  },

  getProfileById: (_parent: any, { id }: { id: string }, { services }: any) => {
    return services.profile.getProfile({ id });
  },

  getSuggestedProfiles: (
    _parent: any,
    { limit = 5 },
    { userId, services }: any,
  ) => {
    if (!userId) return [];

    return services.profile.getSuggestedProfiles(userId, limit);
  },

  searchProfiles: (
    _parent: any,
    { query, limit = 10 }: { query: string; limit?: number },
    { services }: any,
  ) => {
    if (!query) return [];

    return services.profile.searchProfiles({ query, limit });
  },

  getFollowers: async (
    _parent: any,
    {
      username,
      cursor,
      limit = 10,
    }: { username: string; cursor?: string; limit: number },
    { services }: any,
  ) => {
    const result = await services.profile.searchFollowers({
      ...{ username, cursor, limit },
      type: "followers",
    });

    return {
      followers: result.profiles,
      hasMore: result.hasMore,
      nextCursor: result.nextCursor,
    };
  },

  getFollowing: async (
    _parent: any,
    {
      username,
      cursor,
      limit = 10,
    }: { username: string; cursor?: string; limit: number },
    { services }: any,
  ) => {
    const result = await services.profile.searchFollowers({
      ...{ username, cursor, limit },
      type: "following",
    });

    return {
      following: result.profiles,
      hasMore: result.hasMore,
      nextCursor: result.nextCursor,
    };
  },

  searchFollowers: async (
    _parent: any,
    {
      username,
      query = "",
      cursor,
      limit = 10,
    }: { username: string; query: string; cursor?: string; limit: number },
    { services }: any,
  ) => {
    const result = await services.profile.searchFollowers({
      ...{ username, query, cursor, limit },
      type: "followers",
    });

    return {
      followers: result.profiles,
      hasMore: result.hasMore,
      nextCursor: result.nextCursor,
    };
  },

  searchFollowing: async (
    _parent: any,
    {
      username,
      query = "",
      cursor,
      limit = 10,
    }: { username: string; query: string; cursor?: string; limit: number },
    { services }: any,
  ) => {
    const result = await services.profile.searchFollowers({
      ...{ username, query, cursor, limit },
      type: "following",
    });

    return {
      following: result.profiles,
      hasMore: result.hasMore,
      nextCursor: result.nextCursor,
    };
  },
};
