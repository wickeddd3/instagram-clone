import { gql } from "@apollo/client";

export const CREATE_PROFILE_MUTATION = gql`
  mutation CreateProfile(
    $id: ID!
    $username: String!
    $email: String!
    $displayName: String!
  ) {
    createProfile(
      id: $id
      username: $username
      email: $email
      displayName: $displayName
    ) {
      id
      username
      email
      displayName
    }
  }
`;
