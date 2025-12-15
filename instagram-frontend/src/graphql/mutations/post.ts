import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost($userId: ID!, $imageUrl: String!, $caption: String) {
    createPost(userId: $userId, imageUrl: $imageUrl, caption: $caption) {
      id
      image_url
      caption
      created_at
      user {
        username
      }
    }
  }
`;
