import { gql } from "@apollo/client";

export const POST_FRAGMENT = gql`
  fragment PostFields on Post {
    id
    imageUrl
    caption
    createdAt
    author {
      id
      username
      avatarUrl
    }
    likesCount
    commentsCount
    isLiked
    isSaved
  }
`;
