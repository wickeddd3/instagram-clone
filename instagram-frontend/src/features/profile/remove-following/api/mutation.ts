import { gql } from "@apollo/client";

export const REMOVE_FOLLOWING = gql`
  mutation RemoveFollowing($username: String!) {
    removeFollowing(username: $username)
  }
`;
