import { Prisma } from "../client";
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
    isSaved: async (parent: any, _args: any, context: any) => {
      if (!context.userId) return false;

      const save = await prisma.savedPost.findUnique({
        where: {
          userId_postId: {
            userId: context.userId,
            postId: parent.id,
          },
        },
      });
      return !!save;
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
  },

  Query: {
    getFeedPosts: async (
      _parent: any,
      { cursor, limit = 5 }: { cursor: string; limit: number },
      context: any
    ) => {
      // Base query options
      const queryOptions: Prisma.PostFindManyArgs = {
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          author: true,
          _count: { select: { comments: true, likes: true } },
        },
      };

      // Only add cursor and skip if a cursor exists
      if (cursor && cursor !== null) {
        queryOptions.cursor = { id: cursor };
        queryOptions.skip = 1; // Skip the actual cursor record to avoid duplicates
      }

      const posts = await prisma.post.findMany(queryOptions);
      const hasMore = posts.length === limit; // if posts length exactly the limit, there might be more
      const nextCursor = hasMore ? posts[posts.length - 1]?.id : null;

      return {
        posts,
        hasMore,
        nextCursor,
      };
    },
    getExplorePosts: async (_parent: any, { limit = 20 }, context: any) => {
      // TODO: Exclude user's own posts and people user follow
      return await prisma.post.findMany({
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          author: true,
          _count: { select: { likes: true, comments: true } },
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
    getProfilePosts: async (
      _parent: any,
      { profileId, cursor, limit = 10 }: any
    ) => {
      // Base query options
      const queryOptions: Prisma.PostFindManyArgs = {
        where: { authorId: profileId },
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          author: true,
          _count: { select: { comments: true, likes: true } },
        },
      };

      // Only add cursor and skip if a cursor exists
      if (cursor && cursor !== null) {
        queryOptions.cursor = { id: cursor };
        queryOptions.skip = 1; // Skip the actual cursor record to avoid duplicates
      }

      const posts = await prisma.post.findMany(queryOptions);
      const hasMore = posts.length === limit; // if posts length exactly the limit, there might be more
      const nextCursor = hasMore ? posts[posts.length - 1]?.id : null;

      return {
        posts,
        hasMore,
        nextCursor,
      };
    },
    getSavedPosts: async (_parent: any, _args: any, context: any) => {
      if (!context.userId)
        throw new Error("Unauthorized: You must be logged in.");

      const savedRecords = await prisma.savedPost.findMany({
        where: { userId: context.userId },
        include: {
          post: {
            include: {
              author: true,
              _count: { select: { likes: true, comments: true } },
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      // Flatten the result: return the Post objects directly
      return savedRecords.map((record) => record.post);
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
    searchProfiles: async (
      _parent: any,
      { query }: { query: string },
      context: any
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
    getRecentSearches: async (_parent: any, _args: any, context: any) => {
      if (!context.userId) return [];

      const records = await prisma.recentSearch.findMany({
        where: { userId: context.userId },
        include: { target: true },
        orderBy: { createdAt: "desc" },
        take: 10,
      });
      return records.map((r) => r.target);
    },
  },

  Mutation: {
    createProfile: async (
      _parent: any,
      { id, username, email, displayName }: any,
      context: any
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

    toggleFollow: async (
      _parent: any,
      { username }: { username: string },
      context: any
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
      context: any
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
      context: any
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

    togglePostSave: async (
      _parent: any,
      { postId }: { postId: string },
      context: any
    ) => {
      if (!context.userId) {
        throw new Error("Unauthorized: You must be logged in.");
      }

      const userId = context.userId;

      const existingSave = await prisma.savedPost.findUnique({
        where: { userId_postId: { userId, postId } },
      });

      if (existingSave) {
        await prisma.savedPost.delete({
          where: { id: existingSave.id },
        });
        return false; // Removed from saved
      } else {
        await prisma.savedPost.create({
          data: { userId, postId },
        });
        return true; // Added to saved
      }
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

    // Recent searches
    addRecentSearch: async (
      _parent: any,
      { targetId }: { targetId: string },
      context: any
    ) => {
      if (!context.userId) return false;

      // Upsert: If it exists, update the timestamp to bring it to the top
      await prisma.recentSearch.upsert({
        where: { userId_targetId: { userId: context.userId, targetId } },
        update: { createdAt: new Date() },
        create: { userId: context.userId, targetId },
      });
      return true;
    },
    removeRecentSearch: async (
      _parent: any,
      { targetId }: { targetId: string },
      context: any
    ) => {
      await prisma.recentSearch.delete({
        where: { userId_targetId: { userId: context.userId, targetId } },
      });
      return true;
    },
    clearRecentSearches: async (_parent: any, _args: any, context: any) => {
      if (!context.userId) return false;

      await prisma.recentSearch.deleteMany({
        where: { userId: context.userId },
      });

      return true;
    },
  },
};
