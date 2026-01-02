import { gql } from "@apollo/client";

export const CREATE_PROFILE_MUTATION = gql`
  mutation CreateProfile($id: ID!, $username: String!, $email: String!) {
    createProfile(id: $id, username: $username, email: $email) {
      id
      username
      email
    }
  }
`;
