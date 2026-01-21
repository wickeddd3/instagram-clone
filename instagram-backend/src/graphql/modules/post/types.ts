export const PostTypes = `#graphql
  extend type Query {
    # Feed and Discovery
    getFeedPosts(cursor: String, limit: Int): FeedResponse
    getExplorePosts(cursor: String, limit: Int): FeedResponse
    getProfilePosts(profileId: ID!, cursor: String, limit: Int): FeedResponse
    getSavedPosts(cursor: String, limit: Int): FeedResponse
  }

  extend type Mutation {
    # Content Creation
    createPost(imageUrl: String!, caption: String, location: String): Post!

    # Interaction
    togglePostLike(postId: ID!): PostLikeResponse!
    togglePostSave(postId: ID!): PostSaveResponse!
  }

  type Post {
    id: ID!
    imageUrl: String!
    caption: String
    location: String
    author: Profile!
    
    # Interactivity
    likesCount: Int!
    commentsCount: Int!
    isLiked: Boolean!
    isSaved: Boolean!
    
    likes: [Like!]!
    comments: [Comment!]!
    
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Like {
    id: ID!
    user: Profile!
    # A like can belong to a post OR a comment
    postId: ID
    commentId: ID
    createdAt: DateTime!
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
