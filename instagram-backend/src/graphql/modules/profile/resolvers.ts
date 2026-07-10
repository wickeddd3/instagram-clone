import { prisma } from "@/lib/prisma";
import type { GraphQLContext } from "@/graphql/context";

export interface ProfileParent {
  id: string;
  _count?: { posts?: number; followers?: number; following?: number };
  // Present when the query included a scoped `followers` relation for the viewer
  followers?: unknown[];
  // Computed by the profile service on suggestion queries
  mutualFriend?: unknown;
}

export const ProfileResolvers = {
  postsCount: (parent: ProfileParent) => parent._count?.posts ?? 0,
  followersCount: (parent: ProfileParent) => parent._count?.followers ?? 0,
  followingCount: (parent: ProfileParent) => parent._count?.following ?? 0,
  isFollowing: async (parent: ProfileParent, _args: unknown, context: GraphQLContext) => {
    if (!context.userId || parent.id === context.userId) return false;

    // Check if the parent already has the followers array from a 'where' include
    if (parent.followers && Array.isArray(parent.followers)) {
      return parent.followers.length > 0;
    }

    const follow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: context.userId,
          followingId: parent.id,
        },
      },
    });
    return !!follow;
  },
  isMe: (parent: ProfileParent, _args: unknown, context: GraphQLContext) => {
    return context.userId ? parent.id === context.userId : false;
  },
  mutualFriend: (parent: ProfileParent) => parent.mutualFriend ?? null,
};
