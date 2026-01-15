import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query GetProfile($username: String!) {
    getProfile(username: $username) {
      id
      username
      displayName
      avatarUrl
      bio
      website
      postsCount
      followersCount
      followingCount
      isFollowing
      isMe
    }
  }
`;

export const GET_PROFILE_BY_ID = gql`
  query GetProfileById($id: ID!) {
    getProfileById(id: $id) {
      id
      username
      displayName
      avatarUrl
      bio
      website
      postsCount
      followersCount
      followingCount
      isFollowing
      isMe
    }
  }
`;

export const GET_FOLLOWERS = gql`
  query GetFollowers($username: String!) {
    getFollowers(username: $username) {
      id
      username
      displayName
      avatarUrl
    }
  }
`;

export const GET_FOLLOWING = gql`
  query GetFollowing($username: String!) {
    getFollowing(username: $username) {
      id
      username
      displayName
      avatarUrl
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
