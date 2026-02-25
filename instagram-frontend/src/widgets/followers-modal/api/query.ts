import { PROFILE_FRAGMENT } from "@/entities/profile";
import { gql } from "@apollo/client";

export const GET_FOLLOWERS = gql`
  query GetFollowers($username: String!, $cursor: String, $limit: Int) {
    getFollowers(username: $username, cursor: $cursor, limit: $limit) {
      followers {
        ...ProfileFields
      }
      hasMore
      nextCursor
    }
  }

  ${PROFILE_FRAGMENT}
`;

export const SEARCH_FOLLOWERS = gql`
  query SearchFollowers(
    $username: String!
    $query: String
    $cursor: String
    $limit: Int
  ) {
    searchFollowers(
      username: $username
      query: $query
      cursor: $cursor
      limit: $limit
    ) {
      followers {
        ...ProfileFields
      }
      hasMore
      nextCursor
    }
  }

  ${PROFILE_FRAGMENT}
`;
