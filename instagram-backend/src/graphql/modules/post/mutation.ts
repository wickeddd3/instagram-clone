export const PostMutation = {
  createPost: (
    _parent: any,
    { imageUrl, caption = "", location = "" }: any,
    { userId, services }: any,
  ) => {
    if (!userId) throw new Error("Unauthorized");

    return services.post.createPost(userId, { imageUrl, caption, location });
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
