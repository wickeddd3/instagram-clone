import { gql } from "@apollo/client";

export const PROFILE_FRAGMENT = gql`
  fragment ProfileFields on Profile {
    id
    username
    email
    displayName
    avatarUrl
    bio
    website
  }
`;
