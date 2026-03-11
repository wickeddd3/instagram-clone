export const StoryTypes = `#graphql
  extend type Query {
    getStoriesFeed(profileId: ID!): [UserStory!]!
    getStoryViewers(storyId: ID!): [StoryViewer!]!
  }

  extend type Mutation {
    createStory(mediaUrl: String!, mediaType: String!): UserStory
    viewStory(storyId: ID!): Boolean
  }

  type Story {
    id: ID!
    mediaUrl: String!
    mediaType: String!
    createdAt: DateTime!
    expiresAt: DateTime!
    viewsCount: Int
  }

  type UserStory {
    id: ID!
    username: String!
    avatarUrl: String
    hasUnseenStories: Boolean
    stories: [Story!]!
  }

  type StoryViewer {
    id: ID!
    viewedAt: DateTime!
    viewer: Viewer
  }

  type Viewer {
    id: ID!
    username: String!
    avatarUrl: String
  }
`;
