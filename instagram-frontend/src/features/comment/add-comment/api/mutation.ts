import { gql } from "@apollo/client";
import { COMMENT_FRAGMENT } from "@/entities/comment";

export const ADD_COMMENT = gql`
  mutation AddComment($postId: ID!, $text: String!, $parentId: ID) {
    addComment(postId: $postId, text: $text, parentId: $parentId) {
      ...CommentFields
    }
  }

  ${COMMENT_FRAGMENT}
`;
