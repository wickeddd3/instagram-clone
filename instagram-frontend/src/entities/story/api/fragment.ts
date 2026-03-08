import { gql } from "@apollo/client";

export const STORY_FRAGMENT = gql`
  fragment StoryFields on Story {
    id
    mediaUrl
    mediaType
    createdAt
    expiresAt
    author {
      id
      username
      avatarUrl
    }
  }
`;
