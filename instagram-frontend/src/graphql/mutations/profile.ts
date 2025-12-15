import { gql } from "@apollo/client";

export const CREATE_PROFILE_MUTATION = gql`
  mutation CreateProfile($id: ID!, $username: String!) {
    createProfile(id: $id, username: $username, avatarUrl: null) {
      id
      username
    }
  }
`;
