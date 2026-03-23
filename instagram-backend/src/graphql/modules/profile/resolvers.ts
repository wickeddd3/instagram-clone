import { prisma } from "../../../lib/prisma";

export const ProfileResolvers = {
  postsCount: (parent: any) => parent._count?.posts ?? 0,
  followersCount: (parent: any) => parent._count?.followers ?? 0,
  followingCount: (parent: any) => parent._count?.following ?? 0,
  isFollowing: async (parent: any, _args: any, context: any) => {
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
  isMe: (parent: any, _args: any, context: any) => {
    return context.userId ? parent.id === context.userId : false;
  },
  mutualFriend: (parent: any) => parent.mutualFriend || null,
};
