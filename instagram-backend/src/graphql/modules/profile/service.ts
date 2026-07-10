import type { PrismaClient } from "../../../client";
import { Prisma } from "../../../client";

// Prisma can't infer the payload when the include key is computed at runtime
// (see searchFollowers), so we describe the shape we know we requested.
type FollowWithProfiles = Prisma.FollowGetPayload<{
  include: {
    follower: {
      include: {
        _count: { select: { followers: true; following: true; posts: true } };
      };
    };
    following: {
      include: {
        _count: { select: { followers: true; following: true; posts: true } };
      };
    };
  };
}>;

export class ProfileService {
  constructor(private prisma: PrismaClient) {}

  private async getFollowingIds(userId: string) {
    const following = await this.prisma.follow.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    });
    const followingIds = following.map((f) => f.followingId);

    return followingIds;
  }

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

  async createProfile(data: { id: string; username: string; email: string; displayName: string }) {
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

  // Callers look a profile up by exactly one unique field, so a union expresses
  // the contract Prisma's WhereUniqueInput requires.
  async getProfile(where: { username: string } | { id: string }) {
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
    if (targetProfile.id === followerId) throw new Error("You cannot follow yourself");

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
      followersCount: updated?._count.followers ?? 0,
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
    // 1. Get IDs of people the user follows
    const followingIds = await this.getFollowingIds(userId);

    // 2. Find "Friends of Friends" (Mutuals)
    // Look for profiles followed by your following,
    // excluding authUser and people authUser already follow.
    const suggestedWithMutuals = await this.prisma.profile.findMany({
      where: {
        AND: [
          { id: { not: userId } },
          { id: { notIn: followingIds } },
          {
            followers: {
              some: {
                followerId: { in: followingIds },
              },
            },
          },
        ],
      },
      take: limit,
      include: {
        followers: {
          where: { followerId: { in: followingIds } },
          select: { follower: { select: { username: true } } },
          take: 1, // Just get one name for the "Followed by X" label
        },
        _count: { select: { followers: true } },
      },
    });

    // 3. If we don't have enough mutuals, fill with popular accounts
    let finalSuggestions = [...suggestedWithMutuals];

    if (finalSuggestions.length < limit) {
      const finalSuggestionIds = finalSuggestions.map((profile) => profile.id);
      const popular = await this.prisma.profile.findMany({
        where: {
          AND: [
            { id: { not: userId } },
            {
              id: {
                notIn: [...followingIds, ...finalSuggestionIds],
              },
            },
          ],
        },
        take: limit - finalSuggestions.length,
        orderBy: { followers: { _count: "desc" } },
        // Same include as the mutuals query so both arrays share one type
        // (popular accounts simply have no matching mutual, so the list is empty).
        include: {
          followers: {
            where: { followerId: { in: followingIds } },
            select: { follower: { select: { username: true } } },
            take: 1,
          },
          _count: { select: { followers: true } },
        },
      });
      finalSuggestions = [...finalSuggestions, ...popular];
    }

    // 4. Map the data to include the mutualFriend string
    return finalSuggestions.map((profile) => ({
      ...profile,
      mutualFriend: profile.followers[0]?.follower.username ?? null,
    }));
  }

  async searchProfiles({ query, limit = 10 }: { query: string; limit?: number }) {
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

    // The include key is computed at runtime so Prisma widens the payload to the
    // base Follow row; assert the shape we actually requested.
    const rows = data as unknown as FollowWithProfiles[];
    const profiles = rows.map((item) => (isSearchingFollowers ? item.follower : item.following));

    const last = data[data.length - 1];
    const hasMore = data.length === limit;
    const nextCursor = hasMore && last ? (isSearchingFollowers ? last.followerId : last.followingId) : null;

    return { profiles, hasMore, nextCursor };
  }
}
