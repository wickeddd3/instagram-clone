import { gql } from "@apollo/client";

export const TOGGLE_POST_LIKE = gql`
  mutation TogglePostLike($postId: ID!) {
    togglePostLike(postId: $postId) {
      id
      isLiked
      likesCount
    }
  }
`;
