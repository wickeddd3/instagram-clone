import { gql } from "@apollo/client";

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($displayName: String, $bio: String, $website: String) {
    updateProfile(displayName: $displayName, bio: $bio, website: $website) {
      id
      displayName
      bio
      website
    }
  }
`;
