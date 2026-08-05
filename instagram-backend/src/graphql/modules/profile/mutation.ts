import type { GraphQLContext } from "@/graphql/context";
import { unauthenticatedError } from "@/graphql/errors";
import { validateInput } from "@/graphql/validation";
import { avatarSchema, createProfileSchema, updateProfileSchema } from "./schema";

export const ProfileMutation = {
  createProfile: (
    _parent: unknown,
    args: {
      id: string;
      username: string;
      email: string;
      displayName: string;
    },
    { services }: GraphQLContext,
  ) => {
    const data = validateInput(createProfileSchema, args);

    return services.profile.createProfile(data);
  },

  updateProfile: (
    _parent: unknown,
    args: {
      displayName?: string;
      bio?: string;
      website?: string;
    },
    { userId, services }: GraphQLContext,
  ) => {
    if (!userId) throw unauthenticatedError();

    const data = validateInput(updateProfileSchema, args);

    return services.profile.updateProfile(userId, data);
  },

  uploadProfileAvatar: (_parent: unknown, args: { avatarUrl: string }, { userId, services }: GraphQLContext) => {
    if (!userId) throw unauthenticatedError();

    const { avatarUrl } = validateInput(avatarSchema, args);

    return services.profile.updateProfile(userId, { avatarUrl });
  },

  removeProfileAvatar: async (_parent: unknown, _args: unknown, { userId, services }: GraphQLContext) => {
    if (!userId) throw unauthenticatedError();

    return services.profile.updateProfile(userId, { avatarUrl: null });
  },

  toggleFollow: async (_parent: unknown, { username }: { username: string }, { userId, services }: GraphQLContext) => {
    if (!userId) throw unauthenticatedError();

    return services.profile.toggleFollow(userId, username);
  },

  removeFollower: async (
    _parent: unknown,
    { username }: { username: string },
    { userId, services }: GraphQLContext,
  ) => {
    if (!userId) throw unauthenticatedError();

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
    if (!userId) throw unauthenticatedError();

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
