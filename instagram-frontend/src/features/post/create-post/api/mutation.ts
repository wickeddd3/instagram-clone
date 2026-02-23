import { POST_FRAGMENT } from "@/entities/post";
import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost($imageUrl: String!, $caption: String) {
    createPost(imageUrl: $imageUrl, caption: $caption) {
      ...PostFields
    }
  }

  ${POST_FRAGMENT}
`;
