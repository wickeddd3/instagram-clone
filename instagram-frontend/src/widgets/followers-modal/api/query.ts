import { gql } from "@apollo/client";

export const GET_FOLLOWERS = gql`
  query GetFollowers($username: String!) {
    getFollowers(username: $username) {
      id
      username
      displayName
      avatarUrl
    }
  }
`;
