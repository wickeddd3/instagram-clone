import { gql } from "@apollo/client";

export const GET_SUGGESTED_PROFILES = gql`
  query GetSuggestedProfiles($limit: Int) {
    getSuggestedProfiles(limit: $limit) {
      id
      username
      displayName
      avatarUrl
      bio
      website
      followersCount
      mutualFriend
    }
  }
`;
