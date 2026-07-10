import type { GraphQLContext } from "@/graphql/context";

export const ProfileMutation = {
  createProfile: (
    _parent: unknown,
    {
      id,
      username,
      email,
      displayName,
    }: {
      id: string;
      username: string;
      email: string;
      displayName: string;
    },
    { services }: GraphQLContext,
  ) => {
    return services.profile.createProfile({
      id,
      username,
      email,
      displayName,
    });
  },

  updateProfile: (
    _parent: unknown,
    {
      displayName,
      bio,
      website,
    }: {
      displayName?: string;
      bio?: string;
      website?: string;
    },
    { userId, services }: GraphQLContext,
  ) => {
    if (!userId) throw new Error("Unauthorized");

    return services.profile.updateProfile(userId, {
      displayName,
      bio,
      website,
    });
  },

  uploadProfileAvatar: (
    _parent: unknown,
    { avatarUrl }: { avatarUrl: string },
    { userId, services }: GraphQLContext,
  ) => {
    if (!userId) throw new Error("Unauthorized");

    return services.profile.updateProfile(userId, { avatarUrl });
  },

  removeProfileAvatar: async (_parent: unknown, _args: unknown, { userId, services }: GraphQLContext) => {
    if (!userId) throw new Error("Unauthorized");

    return services.profile.updateProfile(userId, { avatarUrl: null });
  },

  toggleFollow: async (_parent: unknown, { username }: { username: string }, { userId, services }: GraphQLContext) => {
    if (!userId) throw new Error("Unauthorized");

    return services.profile.toggleFollow(userId, username);
  },

  removeFollower: async (
    _parent: unknown,
    { username }: { username: string },
    { userId, services }: GraphQLContext,
  ) => {
    if (!userId) throw new Error("Unauthorized");

    // Find the user who is following me
    const follower = await services.profile.getProfile({ username });
    if (!follower) throw new Error("User not found");

    // "Remove Follower" means the follower is the target, and WE are the one being followed
    await services.profile.removeConnection({
      followerId: follower.id,
      followingId: userId,
    });

    return false;
  },

  removeFollowing: async (
    _parent: unknown,
    { username }: { username: string },
    { userId, services }: GraphQLContext,
  ) => {
    if (!userId) throw new Error("Unauthorized");

    // Find the user who I follow
    const following = await services.profile.getProfile({ username });
    if (!following) throw new Error("User not found");

    // "Remove Following" means WE are the follower, and they are the one being followed
    await services.profile.removeConnection({
      followerId: userId,
      followingId: following.id,
    });

    return false;
  },
};
