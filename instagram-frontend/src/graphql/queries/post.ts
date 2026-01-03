import { gql } from "@apollo/client";

export const GET_FEED = gql`
  query GetFeed {
    getFeed {
      id
      imageUrl
      caption
      createdAt
      author {
        username
        avatarUrl
      }
    }
  }
`;

export const GET_PROFILE_POSTS = gql`
  query GetProfilePosts($profileId: ID!, $limit: Int, $offset: Int) {
    getProfilePosts(profileId: $profileId, limit: $limit, offset: $offset) {
      id
      imageUrl
      caption
      createdAt
      author {
        username
        avatarUrl
      }
    }
  }
`;
