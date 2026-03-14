import { gql } from "@apollo/client";
import { POST_FRAGMENT } from "@/entities/post";

export const GET_EXPLORE_POSTS = gql`
  query GetExplorePosts($profileId: ID!, $cursor: String, $limit: Int) {
    getExplorePosts(profileId: $profileId, cursor: $cursor, limit: $limit) {
      posts {
        ...PostFields
      }
      hasMore
      nextCursor
    }
  }

  ${POST_FRAGMENT}
`;
