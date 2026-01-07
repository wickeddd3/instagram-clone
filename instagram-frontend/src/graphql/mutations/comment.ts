import { gql } from "@apollo/client";

export const ADD_COMMENT = gql`
  mutation AddComment($postId: ID!, $text: String!, $parentId: ID) {
    addComment(postId: $postId, text: $text, parentId: $parentId) {
      id
      text
      createdAt
      author {
        id
        username
        avatarUrl
      }
    }
  }
`;

export const TOGGLE_COMMENT_LIKE = gql`
  mutation ToggleCommentLike($commentId: ID!) {
    toggleCommentLike(commentId: $commentId)
  }
`;
