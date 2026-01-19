import { useMutation } from "@apollo/client/react";
import { TOGGLE_POST_LIKE, TOGGLE_POST_SAVE } from "../graphql/mutations/post";
import type { PostData } from "../types/post";

export const usePostActions = ({ post }: { post: PostData | null }) => {
  if (!post) {
    return { togglePostLike: () => {}, togglePostSave: () => {} };
  }

  const { id: postId, isLiked, isSaved, likesCount } = post;

  const [togglePostLike] = useMutation(TOGGLE_POST_LIKE, {
    optimisticResponse: (vars) => ({
      togglePostLike: {
        id: vars.postId,
        isLiked: !isLiked,
        likesCount: isLiked ? likesCount - 1 : likesCount + 1,
        __typename: "PostLikeResponse",
      },
    }),
    // This update function links the Response to the Post object in cache
    update(cache, { data: { togglePostLike } }: any) {
      cache.modify({
        id: cache.identify({ __typename: "Post", id: postId }),
        fields: {
          isLiked: () => togglePostLike.isLiked,
          likesCount: () => togglePostLike.likesCount,
        },
      });
    },
  });

  const [togglePostSave] = useMutation(TOGGLE_POST_SAVE, {
    optimisticResponse: (vars) => ({
      togglePostSave: {
        id: vars.postId,
        isSaved: !isSaved,
        __typename: "PostSaveResponse",
      },
    }),
    update(cache, { data: { togglePostSave } }: any) {
      cache.modify({
        id: cache.identify({ __typename: "Post", id: postId }),
        fields: {
          isSaved: () => togglePostSave.isSaved,
        },
      });
    },
  });

  return { togglePostLike, togglePostSave };
};
