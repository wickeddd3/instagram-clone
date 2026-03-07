import { useMutation } from "@apollo/client/react";
import type { CreatedPost } from "./types";
import { CREATE_POST } from "../api/mutation";

export const useCreatePost = ({ onCompleted }: { onCompleted: () => void }) => {
  const [createPost] = useMutation<CreatedPost>(CREATE_POST, {
    update(cache, { data }) {
      const newPost = data?.createPost;
      if (!newPost) return;

      const postRef = cache.identify({ __typename: "Post", id: newPost.id });

      cache.modify({
        fields: {
          getFeedPosts(existingFeedData) {
            return {
              ...existingFeedData,
              posts: [{ __ref: postRef }, ...existingFeedData.posts],
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
