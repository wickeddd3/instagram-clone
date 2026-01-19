import { gql } from "@apollo/client";
import { COMMENT_FIELDS } from "../fragments/comment";

export const GET_COMMENTS = gql`
  query GetComments($postId: ID!, $parentId: ID, $cursor: String, $limit: Int) {
    getComments(
      postId: $postId
      parentId: $parentId
      cursor: $cursor
      limit: $limit
    ) {
      comments {
        ...CommentFields
      }
      hasMore
      nextCursor
    }
  }

  ${COMMENT_FIELDS}
`;
