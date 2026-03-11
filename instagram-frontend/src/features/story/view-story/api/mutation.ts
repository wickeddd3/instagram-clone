import { gql } from "@apollo/client";

export const VIEW_STORY = gql`
  mutation ViewStory($storyId: ID!) {
    viewStory(storyId: $storyId)
  }
`;
