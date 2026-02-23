import { gql } from "@apollo/client";

export const TOGGLE_FOLLOW = gql`
  mutation ToggleFollow($username: String!) {
    toggleFollow(username: $username) {
      id
      isFollowing
      followersCount
    }
  }
`;
