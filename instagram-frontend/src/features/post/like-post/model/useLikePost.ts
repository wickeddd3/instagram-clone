import { useMutation } from "@apollo/client/react";
import type { Post } from "@/entities/post";
import { TOGGLE_POST_LIKE } from "../api/mutations";

interface TogglePostLikeData {
  togglePostLike: {
    id: string;
    isLiked: boolean;
    likesCount: number;
    __typename: "PostLikeResponse";
  };
}

export const useLikePost = ({ post }: { post: Post }) => {
  const { id: postId, isLiked, likesCount } = post;

  const [togglePostLike] = useMutation<
    TogglePostLikeData,
    { postId: string }
  >(TOGGLE_POST_LIKE, {
    optimisticResponse: (vars) => ({
      togglePostLike: {
        id: vars.postId,
        isLiked: !isLiked,
        likesCount: isLiked ? likesCount - 1 : likesCount + 1,
        __typename: "PostLikeResponse",
      },
    }),
    // This update function links the Response to the Post object in cache
    update(cache, { data }) {
      const togglePostLike = data?.togglePostLike;
      if (!togglePostLike) return;
      cache.modify({
        id: cache.identify({ __typename: "Post", id: postId }),
        fields: {
          isLiked: () => togglePostLike.isLiked,
          likesCount: () => togglePostLike.likesCount,
        },
      });
    },
  });

  return { togglePostLike };
};
