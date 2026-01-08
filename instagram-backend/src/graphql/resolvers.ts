import { prisma } from "../lib/prisma";

export const resolvers = {
  // Field resolvers for the Post type
  Post: {
    // 'parent' is the Post object returned from Prisma
    likesCount: (parent: any) => parent._count?.likes ?? 0,
    commentsCount: (parent: any) => parent._count?.comments ?? 0,
    // Check if the current user liked this specific post
    isLiked: async (parent: any, _args: any, context: any) => {
      // If no user is logged in, they can't have liked it
      if (!context.userId) return false;
      // Check the 'likes' table for a match
      const like = await prisma.like.findUnique({
        where: {
          userId_postId: {
            userId: context.userId,
            postId: parent.id,
          },
        },
      });

      // If a record exists, return true (post is liked)
      return !!like;
    },
  },

  // Field resolver to map the reply count
  Comment: {
    likesCount: (parent: any) => parent._count?.likes ?? 0,
    repliesCount: (parent: any) => parent._count?.replies ?? 0,
    // Check if the current user liked this specific comment
    isLiked: async (parent: any, _args: any, context: any) => {
      // If no user is logged in, they can't have liked it
      if (!context.userId) return false;
      // Check the 'likes' table for a match
      const like = await prisma.like.findUnique({
        where: {
          userId_commentId: {
            userId: context.userId,
            commentId: parent.id,
          },
        },
      });

      // If a record exists, return true (comment is liked)
      return !!like;
    },
  },

  // Field resolvers for the Profile type
  Profile: {
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
  },

  Query: {
    getFeed: async (
      _parent: any,
      { limit = 10, offset = 0 }: any,
      context: any
    ) => {
      return await prisma.post.findMany({
        take: limit,
        skip: offset,
        orderBy: { createdAt: "desc" },
        include: {
          author: true,
          _count: {
            select: { comments: true, likes: true },
          },
        },
      });
    },
    getProfile: async (_parent: any, { id }: { id: string }) => {
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
    getProfilePosts: async (
      _parent: any,
      { profileId, limit = 10, offset = 0 }: any
    ) => {
      return await prisma.post.findMany({
        where: { authorId: profileId },
        take: limit,
        skip: offset,
        orderBy: { createdAt: "desc" },
        include: {
          author: true,
          likes: true,
          _count: {
            select: { comments: true, likes: true },
          },
        },
      });
    },

    getComments: async (
      _parent: any,
      { postId, parentId }: { postId: string; parentId?: string }
    ) => {
      return await prisma.comment.findMany({
        where: {
          postId,
          parentId: parentId || null, // Only fetch top-level comments initially
        },
        orderBy: { createdAt: "desc" },
        include: {
          author: true,
          _count: { select: { replies: true } },
        },
      });
    },
  },

  Mutation: {
    createProfile: async (
      _parent: any,
      { id, username, email, avatarUrl, bio, website }: any,
      context: any
    ) => {
      return await prisma.profile.create({
        data: {
          id,
          username,
          email,
          avatarUrl,
          bio,
          website,
        },
      });
    },
    updateProfile: async (
      _parent: any,
      { displayName, bio, website }: any,
      context: any
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
      context: any
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

    createPost: async (
      _parent: any,
      { imageUrl, caption, location }: any,
      context: any
    ) => {
      if (!context.userId) {
        throw new Error("Unauthorized: You must be logged in.");
      }
      // 'context.userId' comes from Auth middleware/Supabase JWT
      return await prisma.post.create({
        data: {
          imageUrl,
          caption,
          location,
          authorId: context.userId,
        },
        include: { author: true },
      });
    },
    // Toggle Like (Like/Unlike logic in one function)
    togglePostLike: async (
      _parent: any,
      { postId }: { postId: string },
      context: any
    ) => {
      const userId = context.userId;

      // Check if like exists
      const existingLike = await prisma.like.findUnique({
        where: {
          userId_postId: { userId, postId },
        },
      });

      if (existingLike) {
        await prisma.like.delete({
          where: { id: existingLike.id },
        });
        return false; // Unliked
      } else {
        await prisma.like.create({
          data: { userId, postId },
        });
        return true; // Liked
      }
    },
    toggleCommentLike: async (
      _parent: any,
      { commentId }: { commentId: string },
      context: any
    ) => {
      const userId = context.userId;

      // Check if like exists
      const existingLike = await prisma.like.findUnique({
        where: {
          userId_commentId: { userId, commentId },
        },
      });

      if (existingLike) {
        await prisma.like.delete({
          where: { id: existingLike.id },
        });
        return false; // Unliked
      } else {
        await prisma.like.create({
          data: { userId, commentId },
        });
        return true; // Liked
      }
    },

    // Add Comment (Handles both Comments and Replies)
    addComment: async (
      _parent: any,
      { postId, text, parentId }: any,
      context: any
    ) => {
      if (!context.userId) {
        throw new Error("Unauthorized: You must be logged in.");
      }

      return await prisma.comment.create({
        data: {
          text,
          postId,
          authorId: context.userId,
          parentId: parentId || null, // If parentId exists, it's a reply
        },
        include: { author: true },
      });
    },
  },
};
