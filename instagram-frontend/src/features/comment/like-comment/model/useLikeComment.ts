import type { Comment } from "@/entities/comment";
import { useMutation } from "@apollo/client/react";
import { TOGGLE_COMMENT_LIKE } from "../api/mutation";

export const useLikeComment = ({ comment }: { comment: Comment }) => {
  const { id, isLiked, likesCount } = comment;

  const [toggleCommentLike] = useMutation(TOGGLE_COMMENT_LIKE, {
    optimisticResponse: (vars) => ({
      toggleCommentLike: {
        id: vars.commentId,
        isLiked: !isLiked,
        likesCount: isLiked ? likesCount - 1 : likesCount + 1,
        __typename: "CommentLikeResponse",
      },
    }),
    // This update function links the Response to the Post object in cache
    update(cache, { data: { toggleCommentLike } }: any) {
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
