import { PrismaClient } from "@prisma/client/extension";

export class ProfileService {
  constructor(private prisma: PrismaClient) {}

  async checkAvailability(email: string, username: string) {
    const [emailExists, usernameExists] = await Promise.all([
      this.prisma.profile.findUnique({ where: { email } }),
      this.prisma.profile.findUnique({ where: { username } }),
    ]);

    return {
      isEmailAvailable: !emailExists,
      isUsernameAvailable: !usernameExists,
    };
  }

  async createProfile(data: {
    id: string;
    username: string;
    email: string;
    displayName: string;
  }) {
    return await this.prisma.profile.create({ data });
  }

  async updateProfile(
    id: string,
    data: {
      displayName?: string;
      bio?: string;
      website?: string;
      avatarUrl?: string | null;
    },
  ) {
    return await this.prisma.profile.update({
      where: { id },
      data,
    });
  }

  async getProfile(where: { username?: string; id?: string }) {
    return await this.prisma.profile.findUnique({
      where,
      include: {
        posts: { orderBy: { createdAt: "desc" } },
        _count: {
          select: { followers: true, following: true, posts: true },
        },
      },
    });
  }

  async toggleFollow(followerId: string, targetUsername: string) {
    const targetProfile = await this.prisma.profile.findUnique({
      where: { username: targetUsername },
    });

    if (!targetProfile) throw new Error("Profile not found");
    if (targetProfile.id === followerId)
      throw new Error("You cannot follow yourself");

    const existingFollow = await this.prisma.follow.findUnique({
      where: {
        followerId_followingId: { followerId, followingId: targetProfile.id },
      },
    });

    if (existingFollow) {
      await this.prisma.follow.delete({
        where: {
          followerId_followingId: { followerId, followingId: targetProfile.id },
        },
      });
    } else {
      await this.prisma.follow.create({
        data: { followerId, followingId: targetProfile.id },
      });
    }

    const updated = await this.prisma.profile.findUnique({
      where: { id: targetProfile.id },
      include: { _count: { select: { followers: true } } },
    });

    return {
      id: targetProfile.id,
      isFollowing: !existingFollow,
      followersCount: updated?._count.followers || 0,
    };
  }

  async removeConnection(params: { followerId: string; followingId: string }) {
    // This handles both "Remove Follower" and "Unfollow" depending on the IDs passed
    return await this.prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId: params.followerId,
          followingId: params.followingId,
        },
      },
    });
  }

  async getSuggestedProfiles(userId: string, limit: number) {
    // Get the IDs of everyone the current user is already following
    const following = await this.prisma.follow.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    });

    const followingIds = following.map((f: any) => f.followingId);

    return await this.prisma.profile.findMany({
      where: {
        AND: [{ id: { not: userId } }, { id: { notIn: followingIds } }],
      },
      take: limit,
      orderBy: { followers: { _count: "desc" } }, // Prioritize popular users
    });
  }

  async searchProfiles({
    query,
    limit = 10,
  }: {
    query: string;
    limit?: number;
  }) {
    return await this.prisma.profile.findMany({
      where: {
        OR: [
          { username: { contains: query, mode: "insensitive" } },
          { displayName: { contains: query, mode: "insensitive" } },
        ],
      },
      take: limit,
    });
  }

  async searchFollowers(params: {
    username: string;
    query?: string;
    cursor?: string;
    limit: number;
    type: "followers" | "following";
  }) {
    const { username, query = "", cursor, limit, type } = params;

    const targetUser = await this.prisma.profile.findUnique({
      where: { username },
      select: { id: true },
    });

    if (!targetUser) throw new Error("User not found");

    const isSearchingFollowers = type === "followers";

    const data = await this.prisma.follow.findMany({
      where: {
        [isSearchingFollowers ? "followingId" : "followerId"]: targetUser.id,
        [isSearchingFollowers ? "follower" : "following"]: {
          OR: [
            { username: { contains: query, mode: "insensitive" } },
            { displayName: { contains: query, mode: "insensitive" } },
          ],
        },
      },
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        [isSearchingFollowers ? "follower" : "following"]: {
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
          followerId_followingId: isSearchingFollowers
            ? { followerId: cursor, followingId: targetUser.id }
            : { followerId: targetUser.id, followingId: cursor },
        },
      }),
    });

    const profiles = data.map((item: any) =>
      isSearchingFollowers ? item.follower : item.following,
    );

    const hasMore = data.length === limit;
    const nextCursor = hasMore
      ? isSearchingFollowers
        ? data[data.length - 1].followerId
        : data[data.length - 1].followingId
      : null;

    return { profiles, hasMore, nextCursor };
  }
}
