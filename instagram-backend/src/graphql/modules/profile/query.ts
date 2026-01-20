import { prisma } from "../../../lib/prisma";

export const ProfileQuery = {
  getProfile: async (_parent: any, { username }: { username: string }) => {
    return await prisma.profile.findUnique({
      where: { username },
      include: {
        posts: { orderBy: { createdAt: "desc" } },
        _count: {
          select: { followers: true, following: true, posts: true },
        },
      },
    });
  },
  getProfileById: async (_parent: any, { id }: { id: string }) => {
    return await prisma.profile.findUnique({
      where: { id },
      include: {
        posts: { orderBy: { createdAt: "desc" } },
        _count: {
          select: { followers: true, following: true, posts: true },
        },
      },
    });
  },
  getSuggestedProfiles: async (_parent: any, { limit = 5 }, context: any) => {
    const { userId } = context;

    if (!userId) return [];

    // Get the IDs of everyone the current user is already following
    const following = await prisma.follow.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    });

    const followingIds = following.map((f: any) => f.followingId);

    // Query for suggestions
    return await prisma.profile.findMany({
      where: {
        AND: [
          { id: { not: userId } }, // Not auth user
          { id: { notIn: followingIds } }, // Not auth user already follow
        ],
      },
      take: limit,
      orderBy: {
        followers: {
          _count: "desc", // Prioritize popular users
        },
      },
    });
  },
  searchProfiles: async (
    _parent: any,
    { query }: { query: string },
    context: any,
  ) => {
    if (!query) return [];

    return await prisma.profile.findMany({
      where: {
        OR: [
          { username: { contains: query, mode: "insensitive" } },
          { displayName: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 10,
    });
  },
  getFollowers: async (_parent: any, { username }: { username: string }) => {
    const user = await prisma.profile.findUnique({
      where: { username },
      include: {
        followers: {
          include: {
            follower: {
              include: {
                _count: {
                  select: { followers: true, following: true, posts: true },
                },
              },
            },
          },
        },
      },
    });
    // Map the nested join table structure back to a flat Profile array
    return user?.followers.map((f) => f.follower) || [];
  },
  getFollowing: async (_parent: any, { username }: { username: string }) => {
    const user = await prisma.profile.findUnique({
      where: { username },
      include: {
        following: {
          include: {
            following: {
              include: {
                _count: {
                  select: { followers: true, following: true, posts: true },
                },
              },
            },
          },
        },
      },
    });
    return user?.following.map((f) => f.following) || [];
  },
};
