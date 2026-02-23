import { gql } from "@apollo/client";

export const GET_FOLLOWING = gql`
  query GetFollowing($username: String!) {
    getFollowing(username: $username) {
      id
      username
      displayName
      avatarUrl
    }
  }
`;
