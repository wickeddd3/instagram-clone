import { gql } from "@apollo/client";

export const ADD_RECENT_SEARCH = gql`
  mutation AddRecentSearch($targetId: ID!) {
    addRecentSearch(targetId: $targetId)
  }
`;

export const REMOVE_RECENT_SEARCH = gql`
  mutation RemoveRecentSearch($targetId: ID!) {
    removeRecentSearch(targetId: $targetId)
  }
`;

export const CLEAR_RECENT_SEARCHES = gql`
  mutation ClearRecentSearches {
    clearRecentSearches
  }
`;
