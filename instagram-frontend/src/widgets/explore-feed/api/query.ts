import { gql } from "@apollo/client";
import { POST_FRAGMENT } from "@/entities/post";

export const GET_EXPLORE_POSTS = gql`
  query GetExplorePosts($cursor: String, $limit: Int) {
    getExplorePosts(cursor: $cursor, limit: $limit) {
      posts {
        ...PostFields
      }
      hasMore
      nextCursor
    }
  }

  ${POST_FRAGMENT}
`;
