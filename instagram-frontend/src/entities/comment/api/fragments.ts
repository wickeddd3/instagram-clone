import { gql } from "@apollo/client";

export const COMMENT_FRAGMENT = gql`
  fragment CommentFields on Comment {
    id
    text
    createdAt
    author {
      id
      username
      avatarUrl
    }
    repliesCount
    likesCount
    isLiked
  }
`;
