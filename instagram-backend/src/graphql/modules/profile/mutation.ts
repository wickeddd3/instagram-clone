import { prisma } from "../../../lib/prisma";

export const ProfileMutation = {
  createProfile: async (
    _parent: any,
    { id, username, email, displayName }: any,
    context: any,
  ) => {
    return await prisma.profile.create({
      data: {
        id,
        username,
        email,
        displayName,
      },
    });
  },
  updateProfile: async (
    _parent: any,
    { displayName, bio, website }: any,
    context: any,
  ) => {
    if (!context.userId) {
      throw new Error("Unauthorized: You must be logged in.");
    }
    return await prisma.profile.update({
      where: { id: context.userId },
      data: {
        displayName,
        bio,
        website,
      },
    });
  },
  uploadProfileAvatar: async (
    _parent: any,
    { avatarUrl }: { avatarUrl: string },
    context: any,
  ) => {
    if (!context.userId) {
      throw new Error("Unauthorized: You must be logged in.");
    }
    return await prisma.profile.update({
      where: { id: context.userId },
      data: {
        avatarUrl,
      },
    });
  },
  removeProfileAvatar: async (_parent: any, _args: any, context: any) => {
    if (!context.userId) {
      throw new Error("Unauthorized: You must be logged in.");
    }
    return await prisma.profile.update({
      where: { id: context.userId },
      data: {
        avatarUrl: null,
      },
    });
  },
  toggleFollow: async (
    _parent: any,
    { username }: { username: string },
    context: any,
  ) => {
    if (!context.userId) {
      throw new Error("Unauthorized: You must be logged in.");
    }

    const profile = await prisma.profile.findUnique({
      where: { username },
    });

    if (!profile) {
      throw new Error("Invalid Profile: username doesn't exist.");
    }

    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: context.userId,
          followingId: profile.id,
        },
      },
    });

    if (existingFollow) {
      await prisma.follow.delete({
        where: {
          followerId_followingId: {
            followerId: context.userId,
            followingId: profile.id,
          },
        },
      });
      return false; // Unfollowed
    } else {
      await prisma.follow.create({
        data: { followerId: context.userId, followingId: profile.id },
      });
      return true; // Followed
    }
  },
  removeFollower: async (
    _parent: any,
    { username }: { username: string },
    context: any,
  ) => {
    if (!context.userId) {
      throw new Error("Unauthorized: You must be logged in.");
    }

    const profile = await prisma.profile.findUnique({
      where: { username },
    });

    if (!profile) {
      throw new Error("Invalid Profile: username doesn't exist.");
    }

    await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId: profile.id,
          followingId: context.userId,
        },
      },
    });
    return false;
  },
  removeFollowing: async (
    _parent: any,
    { username }: { username: string },
    context: any,
  ) => {
    if (!context.userId) {
      throw new Error("Unauthorized: You must be logged in.");
    }

    const profile = await prisma.profile.findUnique({
      where: { username },
    });

    if (!profile) {
      throw new Error("Invalid Profile: username doesn't exist.");
    }

    await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId: context.userId,
          followingId: profile.id,
        },
      },
    });
    return false;
  },
};
