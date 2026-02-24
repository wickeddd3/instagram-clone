import { PROFILE_FRAGMENT } from "@/entities/profile";
import { gql } from "@apollo/client";

export const GET_FOLLOWING = gql`
  query GetFollowing($username: String!, $cursor: String, $limit: Int) {
    getFollowing(username: $username, cursor: $cursor, limit: $limit) {
      following {
        ...ProfileFields
      }
      hasMore
      nextCursor
    }
  }

  ${PROFILE_FRAGMENT}
`;
