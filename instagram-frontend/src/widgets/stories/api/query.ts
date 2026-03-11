import { gql } from "@apollo/client";

export const GET_STORIES_FEED = gql`
  query GetStoriesFeed($profileId: ID!) {
    getStoriesFeed(profileId: $profileId) {
      id
      username
      avatarUrl
      hasUnseenStories
      stories {
        id
        mediaUrl
        mediaType
        createdAt
        expiresAt
        viewsCount
      }
    }
  }
`;
