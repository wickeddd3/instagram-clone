import { gql } from "@apollo/client";

export const GET_FEED_POSTS = gql`
  query GetFeedPosts($cursor: String, $limit: Int) {
    getFeedPosts(cursor: $cursor, limit: $limit) {
      posts {
        id
        imageUrl
        caption
        createdAt
        author {
          username
          avatarUrl
        }
        likesCount
        commentsCount
        isLiked
        isSaved
      }
      hasMore
      nextCursor
    }
  }
`;

export const GET_EXPLORE_POSTS = gql`
  query GetExplorePosts($limit: Int, $offset: Int) {
    getExplorePosts(limit: $limit, offset: $offset) {
      id
      imageUrl
      caption
      createdAt
      author {
        username
        avatarUrl
      }
      likesCount
      commentsCount
      isLiked
      isSaved
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
      likesCount
      commentsCount
      isLiked
      isSaved
    }
  }
`;

export const GET_SAVED_POSTS = gql`
  query GetSavedPosts {
    getSavedPosts {
      id
      imageUrl
      caption
      createdAt
      author {
        username
        avatarUrl
      }
      likesCount
      commentsCount
      isLiked
      isSaved
    }
  }
`;
