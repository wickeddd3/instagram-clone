import { gql } from "@apollo/client";

export const GET_STORY_VIEWERS = gql`
  query GetStoryViewers($storyId: ID!) {
    getStoryViewers(storyId: $storyId) {
      id
      viewedAt
      viewer {
        id
        username
        avatarUrl
      }
    }
  }
`;
