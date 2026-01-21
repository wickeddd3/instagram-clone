export const ProfileTypes = `#graphql
  extend type Query {
    getProfile(username: String!): Profile
    getProfileById(id: ID!): Profile
    getSuggestedProfiles(limit: Int): [Profile!]!
    searchProfiles(query: String!): [Profile!]!
    getFollowers(username: String!): [Profile!]!
    getFollowing(username: String!): [Profile!]!
  }

  extend type Mutation {
    createProfile(id: ID!, username: String!, email: String!, displayName: String!): Profile
    updateProfile(displayName: String, bio: String, website: String): Profile!
    uploadProfileAvatar(avatarUrl: String!): Profile!
    removeProfileAvatar: Profile!
    toggleFollow(username: String!): ProfileFollowResponse!
    removeFollower(username: String!): Boolean!
    removeFollowing(username: String!): Boolean!
  }

  type Profile {
    id: ID!
    username: String!
    email: String!
    displayName: String
    bio: String
    avatarUrl: String
    website: String
    
    # Statistics
    postsCount: Int!
    followersCount: Int!
    followingCount: Int!
    
    # Relationships
    posts: [Post!]!
    savedPosts: [Post!]!
    followers: [Profile!]!
    following: [Profile!]!
    mutualFriend: String
    
    # Auth metadata
    isFollowing: Boolean # Dynamic based on viewer
    isMe: Boolean
    createdAt: DateTime!
  }

  type ProfileFollowResponse {
    id: ID!
    isFollowing: Boolean!
    followersCount: Int!
  }
`;
