import { COMMENT_FRAGMENT } from "@/entities/comment";
import { gql } from "@apollo/client";

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

  ${COMMENT_FRAGMENT}
`;
