import { prisma } from "../../../lib/prisma";

export const ProfileResolvers = {
  postsCount: async (parent: any) => {
    const count = await prisma.post.count({
      where: { authorId: parent.id },
    });
    return count;
  },
  followersCount: async (parent: any) => {
    const count = await prisma.follow.count({
      where: { followingId: parent.id },
    });
    return count;
  },
  followingCount: async (parent: any) => {
    const count = await prisma.follow.count({
      where: { followerId: parent.id },
    });
    return count;
  },
  isFollowing: async (parent: any, _args: any, context: any) => {
    if (!context.userId) return false;

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
    if (!context.userId) return false;

    return parent.id === context.userId;
  },
  mutualFriend: async (parent: any, _args: any, context: any) => {
    if (!context.userId) return null;

    // Find one user that I follow who also follows this suggested profile
    const mutual = await prisma.follow.findFirst({
      where: {
        followerId: context.userId, // Someone I follow
        following: {
          following: {
            some: {
              followingId: parent.id, // ...who also follows the suggested user
            },
          },
        },
      },
      include: { following: true },
    });

    return mutual?.following.username || null;
  },
};
