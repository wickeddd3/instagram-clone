import type { Comment } from "@/entities/comment";
import { useMutation } from "@apollo/client/react";
import { TOGGLE_COMMENT_LIKE } from "../api/mutation";

interface ToggleCommentLikeData {
  toggleCommentLike: {
    id: string;
    isLiked: boolean;
    likesCount: number;
    __typename: "CommentLikeResponse";
  };
}

export const useLikeComment = ({ comment }: { comment: Comment }) => {
  const { id, isLiked, likesCount } = comment;

  const [toggleCommentLike] = useMutation<
    ToggleCommentLikeData,
    { commentId: string }
  >(TOGGLE_COMMENT_LIKE, {
    optimisticResponse: (vars) => ({
      toggleCommentLike: {
        id: vars.commentId,
        isLiked: !isLiked,
        likesCount: isLiked ? likesCount - 1 : likesCount + 1,
        __typename: "CommentLikeResponse",
      },
    }),
    // This update function links the Response to the Post object in cache
    update(cache, { data }) {
      const toggleCommentLike = data?.toggleCommentLike;
      if (!toggleCommentLike) return;
      cache.modify({
        id: cache.identify({ __typename: "Comment", id }),
        fields: {
          isLiked: () => toggleCommentLike.isLiked,
          likesCount: () => toggleCommentLike.likesCount,
        },
      });
    },
  });

  return { toggleCommentLike };
};
