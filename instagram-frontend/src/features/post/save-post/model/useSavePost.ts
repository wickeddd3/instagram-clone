import { useMutation } from "@apollo/client/react";
import { TOGGLE_POST_SAVE } from "../api/mutation";

interface TogglePostSaveData {
  togglePostSave: {
    id: string;
    isSaved: boolean;
    __typename: "PostSaveResponse";
  };
}
import type { Post } from "@/entities/post";
import { useAuth } from "@/entities/profile";

export const useSavePost = ({ post }: { post: Post }) => {
  const { authProfile } = useAuth();
  const profileId = authProfile?.id || "";

  const [togglePostSave] = useMutation<
    TogglePostSaveData,
    { postId: string }
  >(TOGGLE_POST_SAVE, {
    optimisticResponse: (vars) => ({
      togglePostSave: {
        id: vars.postId,
        isSaved: !post.isSaved,
        __typename: "PostSaveResponse",
      },
    }),
    update(cache, { data }) {
      if (!data?.togglePostSave) return;
      const isSaved = data.togglePostSave.isSaved;

      cache.modify({
        id: cache.identify({ __typename: "Post", id: post.id }),
        fields: {
          isSaved: () => isSaved,
        },
      });

      cache.modify({
        fields: {
          getSavedPosts(existing, { storeFieldName }) {
            if (!storeFieldName.includes(profileId)) return existing;

            // Identify post cache reference ID
            const postRef = cache.identify({
              __typename: "Post",
              id: post.id,
            });

            if (isSaved) {
              return {
                ...existing,
                posts: [{ __ref: postRef }, ...existing.posts],
              };
            } else {
              // Remove post from existing saved posts
              const filteredPosts = existing.posts.filter(
                (post: { __ref: string }) => post.__ref !== postRef,
              );
              return {
                ...existing,
                posts: filteredPosts,
              };
            }
          },
        },
      });
    },
  });

  return { togglePostSave };
};
