import { useMutation } from "@apollo/client/react";
import { TOGGLE_POST_SAVE } from "../api/mutation";
import type { Post } from "@/entities/post";

export const useSavePost = ({ post }: { post: Post }) => {
  const [togglePostSave] = useMutation(TOGGLE_POST_SAVE, {
    optimisticResponse: (vars) => ({
      togglePostSave: {
        id: vars.postId,
        isSaved: !post.isSaved,
        __typename: "PostSaveResponse",
      },
    }),
    update(cache, { data: { togglePostSave } }: any) {
      cache.modify({
        id: cache.identify({ __typename: "Post", id: post.id }),
        fields: {
          isSaved: () => togglePostSave.isSaved,
        },
      });
    },
  });

  return { togglePostSave };
};
