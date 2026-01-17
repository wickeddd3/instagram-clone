import { gql } from "@apollo/client";
import { POST_FIELDS } from "../fragments/post";

export const GET_FEED_POSTS = gql`
  query GetFeedPosts($cursor: String, $limit: Int) {
    getFeedPosts(cursor: $cursor, limit: $limit) {
      posts {
        ...PostFields
      }
      hasMore
      nextCursor
    }
  }

  ${POST_FIELDS}
`;

export const GET_EXPLORE_POSTS = gql`
  query GetExplorePosts($limit: Int, $offset: Int) {
    getExplorePosts(limit: $limit, offset: $offset) {
      ...PostFields
    }
  }

  ${POST_FIELDS}
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

  ${POST_FIELDS}
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

  ${POST_FIELDS}
`;
