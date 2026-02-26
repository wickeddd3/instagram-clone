import { POST_FRAGMENT } from "@/entities/post";
import { PROFILE_FRAGMENT } from "@/entities/profile";
import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query GetProfile($username: String!) {
    getProfile(username: $username) {
      ...ProfileFields
      postsCount
      followersCount
      followingCount
      isFollowing
      isMe
    }
  }

  ${PROFILE_FRAGMENT}
`;

export const GET_SAVED_POSTS = gql`
  query GetSavedPosts($profileId: ID!, $cursor: String, $limit: Int) {
    getSavedPosts(profileId: $profileId, cursor: $cursor, limit: $limit) {
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
