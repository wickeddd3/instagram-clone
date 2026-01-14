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

export const UPLOAD_PROFILE_AVATAR = gql`
  mutation UploadProfileAvatar($avatarUrl: String!) {
    uploadProfileAvatar(avatarUrl: $avatarUrl) {
      id
      avatarUrl
    }
  }
`;

export const REMOVE_PROFILE_AVATAR = gql`
  mutation RemoveProfileAvatar {
    removeProfileAvatar {
      id
      avatarUrl
    }
  }
`;

export const TOGGLE_FOLLOW = gql`
  mutation ToggleFollow($username: String!) {
    toggleFollow(username: $username)
  }
`;

export const REMOVE_FOLLOWER = gql`
  mutation RemoveFollower($username: String!) {
    removeFollower(username: $username)
  }
`;

export const REMOVE_FOLLOWING = gql`
  mutation RemoveFollowing($username: String!) {
    removeFollowing(username: $username)
  }
`;

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
