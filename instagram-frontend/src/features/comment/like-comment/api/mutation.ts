import { gql } from "@apollo/client";

export const TOGGLE_COMMENT_LIKE = gql`
  mutation ToggleCommentLike($commentId: ID!) {
    toggleCommentLike(commentId: $commentId) {
      id
      isLiked
      likesCount
    }
  }
`;
