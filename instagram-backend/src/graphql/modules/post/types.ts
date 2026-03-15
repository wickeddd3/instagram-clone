export const PostTypes = `#graphql
  extend type Query {
    # Feed and Discovery
    getFeedPosts(profileId: ID!, cursor: String, limit: Int): FeedResponse
    getExplorePosts(profileId: ID!, cursor: String, limit: Int): FeedResponse
    getProfilePosts(profileId: ID!, cursor: String, limit: Int): FeedResponse
    getSavedPosts(profileId: ID!, cursor: String, limit: Int): FeedResponse
  }

  extend type Mutation {
    # Content Creation
    createPost(media: [PostMediaInput!]!, caption: String, location: String): Post!

    # Interaction
    togglePostLike(postId: ID!): PostLikeResponse!
    togglePostSave(postId: ID!): PostSaveResponse!
  }

  type Post {
    id: ID!
    imageUrl: String!
    caption: String
    location: String
    media: [PostMedia!]!
    author: Profile!
    
    # Interactivity
    likesCount: Int!
    commentsCount: Int!
    isLiked: Boolean!
    isSaved: Boolean!
    isFollowing: Boolean
    
    likes: [Like!]!
    comments: [Comment!]!
    
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type PostMedia {
    id: ID!
    url: String!
    type: String!
    index: Int!
  }

  type Like {
    id: ID!
    user: Profile!
    # A like can belong to a post OR a comment
    postId: ID
    commentId: ID
    createdAt: DateTime!
  }

  input PostMediaInput {
    url: String!
    type: String!
  }

  type FeedResponse {
    posts: [Post!]!
    nextCursor: String
    hasMore: Boolean!
  }

  type PostLikeResponse {
    id: ID!
    isLiked: Boolean!
    likesCount: Int!
  }

  type PostSaveResponse {
    id: ID!
    isSaved: Boolean!
  }
`;
