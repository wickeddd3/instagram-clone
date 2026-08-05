import type { GraphQLContext } from "@/graphql/context";
import { forbiddenError } from "@/graphql/errors";

const EMPTY_FEED = { posts: [], hasMore: false, nextCursor: null };

export const PostQuery = {
  getFeedPosts: (
    _parent: unknown,
    // profileId is part of the SDL args but the feed is derived from the
    // authenticated viewer, so only cursor/limit are used here.
    { cursor, limit = 5 }: { cursor?: string; limit?: number },
    { userId, services }: GraphQLContext,
  ) => {
    if (!userId) return EMPTY_FEED;

    return services.post.getFeedPosts(userId, cursor, limit);
  },

  getExplorePosts: (
    _parent: unknown,
    { cursor, limit = 9 }: { cursor?: string; limit?: number },
    { userId, services }: GraphQLContext,
  ) => {
    if (!userId) return EMPTY_FEED;

    return services.post.getExplorePosts(userId, cursor, limit);
  },

  getProfilePosts: (
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
    { userId, services }: GraphQLContext,
  ) => {
    // The viewer must be authenticated so isLiked/isSaved/isFollowing are scoped
    // to them; the posts themselves belong to `profileId`.
    if (!userId || !profileId) return EMPTY_FEED;

    return services.post.getProfilePosts(userId, profileId, cursor, limit);
  },

  getSavedPosts: (
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
    { userId, services }: GraphQLContext,
  ) => {
    if (!userId) return EMPTY_FEED;
    // Saved posts are private: a viewer may only read their own.
    if (profileId !== userId) throw forbiddenError("You cannot view another user's saved posts");

    return services.post.getSavedPosts(userId, cursor, limit);
  },
};
