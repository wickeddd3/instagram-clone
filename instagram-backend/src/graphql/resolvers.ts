import { prisma } from "../lib/prisma";

export const resolvers = {
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
          likes: true,
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
  },
};
