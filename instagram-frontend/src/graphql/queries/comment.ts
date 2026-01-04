import { gql } from "@apollo/client";

export const GET_COMMENTS = gql`
  query GetComments($postId: ID!, $parentId: ID, $limit: Int, $offset: Int) {
    getComments(
      postId: $postId
      parentId: $parentId
      limit: $limit
      offset: $offset
    ) {
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
  }
`;
