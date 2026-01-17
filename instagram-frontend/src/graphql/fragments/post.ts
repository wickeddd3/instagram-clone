import { gql } from "@apollo/client";

export const POST_FIELDS = gql`
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
