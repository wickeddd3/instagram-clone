import { POST_FRAGMENT } from "@/entities/post";
import { gql } from "@apollo/client";

export const GET_FEED = gql`
  query GetFeedPosts($profileId: ID!, $cursor: String, $limit: Int) {
    getFeedPosts(profileId: $profileId, cursor: $cursor, limit: $limit) {
      posts {
        ...PostFields
      }
      hasMore
      nextCursor
    }
  }

  ${POST_FRAGMENT}
`;
