export const StoryTypes = `#graphql
  extend type Query {
    getStoriesFeed(profileId: ID!): [Stories!]!
  }

  extend type Mutation {
    createStory(mediaUrl: String!, mediaType: String!): Story!
  }

  type Story {
    id: ID!
    mediaUrl: String!
    mediaType: String!
    createdAt: DateTime!
    expiresAt: DateTime!
    
    author: Profile!
  }

  type Stories {
    id: ID!
    username: String!
    avatarUrl: String
    hasUnseenStories: Boolean
    stories: [Story!]!
  }
`;
