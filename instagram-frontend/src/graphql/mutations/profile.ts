import { gql } from "@apollo/client";

export const CREATE_PROFILE_MUTATION = gql`
  mutation CreateProfile($id: ID!, $username: String!, $email: String!) {
    createProfile(id: $id, username: $username, email: $email) {
      id
      username
      email
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
