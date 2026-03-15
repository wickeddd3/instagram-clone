import { POST_FRAGMENT } from "@/entities/post";
import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost(
    $media: [PostMediaInput!]!
    $caption: String
    $location: String
  ) {
    createPost(media: $media, caption: $caption, location: $location) {
      ...PostFields
    }
  }

  ${POST_FRAGMENT}
`;
