import { gql } from "@apollo/client";
import { COMMENT_FIELDS } from "../fragments/comment";

export const ADD_COMMENT = gql`
  mutation AddComment($postId: ID!, $text: String!, $parentId: ID) {
    addComment(postId: $postId, text: $text, parentId: $parentId) {
      ...CommentFields
    }
  }

  ${COMMENT_FIELDS}
`;

export const TOGGLE_COMMENT_LIKE = gql`
  mutation ToggleCommentLike($commentId: ID!) {
    toggleCommentLike(commentId: $commentId)
  }
`;
