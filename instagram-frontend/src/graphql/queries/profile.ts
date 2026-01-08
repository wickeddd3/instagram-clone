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
