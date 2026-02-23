import { gql } from "@apollo/client";

export const TOGGLE_POST_SAVE = gql`
  mutation TogglePostSave($postId: ID!) {
    togglePostSave(postId: $postId) {
      id
      isSaved
    }
  }
`;
