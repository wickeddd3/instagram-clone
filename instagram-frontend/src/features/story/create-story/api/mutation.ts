import { STORY_FRAGMENT } from "@/entities/story/api/fragment";
import { gql } from "@apollo/client";

export const CREATE_STORY = gql`
  mutation CreateStory($mediaUrl: String!, $mediaType: String!) {
    createStory(mediaUrl: $mediaUrl, mediaType: $mediaType) {
      id
      username
      avatarUrl
      hasUnseenStories
      stories {
        ...StoryFields
      }
    }
  }

  ${STORY_FRAGMENT}
`;
