import type { GraphQLContext } from "@/graphql/context";

export const PostQuery = {
  getFeedPosts: (
    _parent: unknown,
    // profileId is part of the SDL args but the feed is derived from the
    // authenticated viewer, so only cursor/limit are used here.
    { cursor, limit = 5 }: { cursor?: string; limit?: number },
    { userId, services }: GraphQLContext,
  ) => {
    if (!userId) return { posts: [], hasMore: false, nextCursor: null };

    return services.post.getFeedPosts(userId, cursor, limit);
  },

  getExplorePosts: async (
    _parent: unknown,
    { cursor, limit = 9 }: { cursor?: string; limit?: number },
    { userId, services }: GraphQLContext,
  ) => {
    if (!userId) return { posts: [], hasMore: false, nextCursor: null };

    return services.post.getExplorePosts(userId, cursor, limit);
  },

  getProfilePosts: async (
    _parent: unknown,
    {
      profileId,
      cursor,
      limit = 5,
    }: {
      profileId: string;
      cursor?: string;
      limit?: number;
    },
    { services }: GraphQLContext,
  ) => {
    if (!profileId) return { posts: [], hasMore: false, nextCursor: null };

    return services.post.getProfilePosts(profileId, cursor, limit);
  },

  getSavedPosts: async (
    _parent: unknown,
    {
      profileId,
      cursor,
      limit = 10,
    }: {
      profileId: string;
      cursor?: string;
      limit?: number;
    },
    { services }: GraphQLContext,
  ) => {
    return services.post.getSavedPosts(profileId, cursor, limit);
  },
};
