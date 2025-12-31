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
