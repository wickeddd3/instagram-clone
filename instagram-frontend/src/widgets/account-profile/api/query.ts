import { POST_FRAGMENT } from "@/entities/post";
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

export const GET_SAVED_POSTS = gql`
  query GetSavedPosts($cursor: String, $limit: Int) {
    getSavedPosts(cursor: $cursor, limit: $limit) {
      posts {
        ...PostFields
      }
      hasMore
      nextCursor
    }
  }

  ${POST_FRAGMENT}
`;

export const GET_PROFILE_POSTS = gql`
  query GetProfilePosts($profileId: ID!, $cursor: String, $limit: Int) {
    getProfilePosts(profileId: $profileId, cursor: $cursor, limit: $limit) {
      posts {
        ...PostFields
      }
      hasMore
      nextCursor
    }
  }

  ${POST_FRAGMENT}
`;
