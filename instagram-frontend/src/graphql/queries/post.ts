import { gql } from "@apollo/client";

export const GET_FEED = gql`
  query GetFeed {
    getFeed {
      id
      image_url
      caption
      created_at
      user {
        username
        avatar_url
      }
    }
  }
`;
