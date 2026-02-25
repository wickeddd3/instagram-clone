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
  getFollowers: async (
    _parent: any,
    {
      username,
      cursor,
      limit = 10,
    }: { username: string; cursor?: string; limit: number },
  ) => {
    const targetUser = await prisma.profile.findUnique({
      where: { username },
      select: { id: true },
    });

    if (!targetUser) throw new Error("User not found");

    const followers = await prisma.follow.findMany({
      where: { followingId: targetUser.id },
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        follower: {
          include: {
            _count: {
              select: { followers: true, following: true, posts: true },
            },
          },
        },
      },
      ...(cursor && {
        skip: 1,
        cursor: {
          followerId_followingId: {
            followerId: cursor,
            followingId: targetUser.id,
          },
        },
      }),
    });

    const followersProfiles = followers.map((f) => ({ ...f.follower }));
    const hasMore = followers.length === limit;
    const nextCursor = hasMore
      ? followers[followers.length - 1]?.followerId
      : null;

    return {
      followers: followersProfiles,
      hasMore,
      nextCursor,
    };
  },
  getFollowing: async (
    _parent: any,
    {
      username,
      cursor,
      limit = 10,
    }: { username: string; cursor?: string; limit: number },
  ) => {
    const targetUser = await prisma.profile.findUnique({
      where: { username },
      select: { id: true },
    });

    if (!targetUser) throw new Error("User not found");

    const following = await prisma.follow.findMany({
      where: { followerId: targetUser.id },
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        following: {
          include: {
            _count: {
              select: { followers: true, following: true, posts: true },
            },
          },
        },
      },
      ...(cursor && {
        skip: 1,
        cursor: {
          followerId_followingId: {
            followerId: targetUser.id,
            followingId: cursor,
          },
        },
      }),
    });

    const followingProfiles = following.map((f) => ({ ...f.following }));
    const hasMore = following.length === limit;
    const nextCursor = hasMore
      ? following[following.length - 1]?.followingId
      : null;

    return {
      following: followingProfiles,
      hasMore,
      nextCursor,
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
  ) => {
    const targetUser = await prisma.profile.findUnique({
      where: { username },
      select: { id: true },
    });

    if (!targetUser) throw new Error("User not found");

    const followers = await prisma.follow.findMany({
      where: {
        followingId: targetUser.id,
        follower: {
          OR: [
            { username: { contains: query, mode: "insensitive" } },
            { displayName: { contains: query, mode: "insensitive" } },
          ],
        },
      },
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        follower: {
          include: {
            _count: {
              select: { followers: true, following: true, posts: true },
            },
          },
        },
      },
      ...(cursor && {
        skip: 1,
        cursor: {
          followerId_followingId: {
            followerId: cursor,
            followingId: targetUser.id,
          },
        },
      }),
    });

    const hasMore = followers.length === limit;
    const nextCursor = hasMore
      ? followers[followers.length - 1]?.followerId
      : null;

    return {
      followers: followers.map((f) => ({ ...f.follower })),
      hasMore,
      nextCursor,
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
  ) => {
    const targetUser = await prisma.profile.findUnique({
      where: { username },
      select: { id: true },
    });

    if (!targetUser) throw new Error("User not found");

    const following = await prisma.follow.findMany({
      where: {
        followerId: targetUser.id,
        following: {
          OR: [
            { username: { contains: query, mode: "insensitive" } },
            { displayName: { contains: query, mode: "insensitive" } },
          ],
        },
      },
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        following: {
          include: {
            _count: {
              select: { followers: true, following: true, posts: true },
            },
          },
        },
      },
      ...(cursor && {
        skip: 1,
        cursor: {
          followerId_followingId: {
            followerId: targetUser.id,
            followingId: cursor,
          },
        },
      }),
    });

    const followingProfiles = following.map((f) => ({ ...f.following }));
    const hasMore = following.length === limit;
    const nextCursor = hasMore
      ? following[following.length - 1]?.followingId
      : null;

    return {
      following: followingProfiles,
      hasMore,
      nextCursor,
    };
  },
};
