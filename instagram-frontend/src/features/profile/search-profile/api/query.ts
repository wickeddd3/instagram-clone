import { gql } from "@apollo/client";

export const GET_RECENT_SEARCHES = gql`
  query GetRecentSearches {
    getRecentSearches {
      id
      username
      displayName
      avatarUrl
      bio
      website
    }
  }
`;

export const SEARCH_PROFILES = gql`
  query SearchProfiles($query: String!) {
    searchProfiles(query: $query) {
      id
      username
      displayName
      avatarUrl
      bio
      website
    }
  }
`;
