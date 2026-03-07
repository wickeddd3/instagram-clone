import { useMutation } from "@apollo/client/react";
import type { CreatedPost } from "./types";
import { CREATE_POST } from "../api/mutation";
import { useAuth } from "@/app/providers/AuthContext";

export const useCreatePost = ({ onCompleted }: { onCompleted: () => void }) => {
  const { authProfile } = useAuth();
  const profileId = authProfile?.id || "";

  const [createPost] = useMutation<CreatedPost>(CREATE_POST, {
    update(cache, { data }) {
      const newPost = data?.createPost;
      if (!newPost) return;

      const postRef = cache.identify({ __typename: "Post", id: newPost.id });

      cache.modify({
        fields: {
          getFeedPosts(existing) {
            return {
              ...existing,
              posts: [{ __ref: postRef }, ...existing.posts],
            };
          },
        },
      });

      cache.modify({
        fields: {
          getProfilePosts(existing, { storeFieldName }) {
            if (!storeFieldName.includes(profileId)) return existing;

            return {
              ...existing,
              posts: [{ __ref: postRef }, ...existing.posts],
            };
          },
        },
      });
    },
    onCompleted: () => {
      onCompleted();
    },
  });

  return { createPost };
};
