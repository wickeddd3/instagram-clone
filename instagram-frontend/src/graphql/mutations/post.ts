import { gql } from "@apollo/client";
import { POST_FIELDS } from "../fragments/post";

export const CREATE_POST = gql`
  mutation CreatePost($imageUrl: String!, $caption: String) {
    createPost(imageUrl: $imageUrl, caption: $caption) {
      ...PostFields
    }
  }

  ${POST_FIELDS}
`;

export const TOGGLE_POST_LIKE = gql`
  mutation TogglePostLike($postId: ID!) {
    togglePostLike(postId: $postId) {
      id
      isLiked
      likesCount
    }
  }
`;

export const TOGGLE_POST_SAVE = gql`
  mutation TogglePostSave($postId: ID!) {
    togglePostSave(postId: $postId)
  }
`;
