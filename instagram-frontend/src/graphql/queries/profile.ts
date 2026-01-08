import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
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
    }
  }
`;
