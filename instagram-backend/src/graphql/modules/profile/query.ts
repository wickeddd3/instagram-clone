import type { GraphQLContext } from "@/graphql/context";

export const ProfileQuery = {
  checkAvailability: (
    _parent: unknown,
    { email, username }: { email: string; username: string },
    { services }: GraphQLContext,
  ) => {
    return services.profile.checkAvailability(email, username);
  },

  getProfile: (_parent: unknown, { username }: { username: string }, { services }: GraphQLContext) => {
    return services.profile.getProfile({ username });
  },

  getProfileById: (_parent: unknown, { id }: { id: string }, { services }: GraphQLContext) => {
    return services.profile.getProfile({ id });
  },

  getSuggestedProfiles: (_parent: unknown, { limit = 5 }, { userId, services }: GraphQLContext) => {
    if (!userId) return [];

    return services.profile.getSuggestedProfiles(userId, limit);
  },

  searchProfiles: (
    _parent: unknown,
    { query, limit = 10 }: { query: string; limit?: number },
    { services }: GraphQLContext,
  ) => {
    if (!query) return [];

    return services.profile.searchProfiles({ query, limit });
  },

  getFollowers: async (
    _parent: unknown,
    { username, cursor, limit = 10 }: { username: string; cursor?: string; limit?: number },
    { services }: GraphQLContext,
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
    _parent: unknown,
    { username, cursor, limit = 10 }: { username: string; cursor?: string; limit?: number },
    { services }: GraphQLContext,
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
    _parent: unknown,
    { username, query = "", cursor, limit = 10 }: { username: string; query?: string; cursor?: string; limit?: number },
    { services }: GraphQLContext,
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
    _parent: unknown,
    { username, query = "", cursor, limit = 10 }: { username: string; query?: string; cursor?: string; limit?: number },
    { services }: GraphQLContext,
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
