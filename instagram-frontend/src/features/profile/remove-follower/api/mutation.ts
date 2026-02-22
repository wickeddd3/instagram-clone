import { gql } from "@apollo/client";

export const REMOVE_FOLLOWER = gql`
  mutation RemoveFollower($username: String!) {
    removeFollower(username: $username)
  }
`;
