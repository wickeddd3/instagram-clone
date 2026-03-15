import { gql } from "@apollo/client";

export const POST_FRAGMENT = gql`
  fragment PostFields on Post {
    id
    caption
    location
    createdAt
    author {
      id
      username
      avatarUrl
    }
    media {
      id
      url
      type
      index
    }
    likesCount
    commentsCount
    isLiked
    isSaved
    isFollowing
  }
`;
