export const ProfileMutation = {
  createProfile: (
    _parent: any,
    { id, username, email, displayName }: any,
    { services }: any,
  ) => {
    return services.profile.createProfile({
      id,
      username,
      email,
      displayName,
    });
  },

  updateProfile: (
    _parent: any,
    { displayName, bio, website }: any,
    { userId, services }: any,
  ) => {
    if (!userId) throw new Error("Unauthorized");

    return services.profile.updateProfile(userId, {
      displayName,
      bio,
      website,
    });
  },

  uploadProfileAvatar: (
    _parent: any,
    { avatarUrl }: { avatarUrl: string },
    { userId, services }: any,
  ) => {
    if (!userId) throw new Error("Unauthorized");

    return services.profile.updateProfile(userId, { avatarUrl });
  },

  removeProfileAvatar: async (
    _parent: any,
    _args: any,
    { userId, services }: any,
  ) => {
    if (!userId) throw new Error("Unauthorized");

    return services.profile.updateProfile(userId, { avatarUrl: null });
  },

  toggleFollow: async (
    _parent: any,
    { username }: { username: string },
    { userId, services }: any,
  ) => {
    if (!userId) throw new Error("Unauthorized");

    return services.profile.toggleFollow(userId, username);
  },

  removeFollower: async (
    _parent: any,
    { username }: { username: string },
    { userId, services }: any,
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
    _parent: any,
    { username }: { username: string },
    { userId, services }: any,
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
