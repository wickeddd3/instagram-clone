export const PostMutation = {
  createPost: (
    _parent: any,
    {
      media,
      caption = "",
      location = "",
    }: {
      media: { url: string; type: string }[];
      caption?: string;
      location?: string;
    },
    { userId, services }: any,
  ) => {
    if (!userId) throw new Error("Unauthorized");

    return services.post.createPost(userId, { media, caption, location });
  },

  togglePostSave: (
    _parent: any,
    { postId }: { postId: string },
    { userId, services }: any,
  ) => {
    if (!userId) throw new Error("Unauthorized");

    return services.post.toggleSave(userId, postId);
  },

  togglePostLike: (
    _parent: any,
    { postId }: { postId: string },
    { userId, services }: any,
  ) => {
    if (!userId) throw new Error("Unauthorized");

    return services.post.toggleLike(userId, postId);
  },
};
