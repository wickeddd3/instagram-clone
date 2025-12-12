export const typeDefs = `#graphql
  type Profile {
    id: ID!
    username: String
    avatar_url: String
    bio: String
  }

  type Post {
    id: ID!
    image_url: String!
    caption: String
    created_at: String
    user: Profile
  }

  type Query {
    getFeed: [Post]
    getProfile(id: ID!): Profile
  }

  type Mutation {
    createPost(userId: ID!, imageUrl: String!, caption: String): Post
    createProfile(id: ID!, username: String!, avatarUrl: String): Profile
  }
`;
