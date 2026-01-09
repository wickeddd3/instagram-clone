import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost($imageUrl: String!, $caption: String) {
    createPost(imageUrl: $imageUrl, caption: $caption) {
      imageUrl
      caption
    }
  }
`;

export const TOGGLE_POST_LIKE = gql`
  mutation TogglePostLike($postId: ID!) {
    togglePostLike(postId: $postId)
  }
`;

export const TOGGLE_POST_SAVE = gql`
  mutation TogglePostSave($postId: ID!) {
    togglePostSave(postId: $postId)
  }
`;
