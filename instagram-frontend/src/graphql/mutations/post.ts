import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost($imageUrl: String!, $caption: String) {
    createPost(imageUrl: $imageUrl, caption: $caption) {
      image_url
      caption
    }
  }
`;
