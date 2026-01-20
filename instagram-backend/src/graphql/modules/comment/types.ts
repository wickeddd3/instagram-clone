export const CommentTypes = `#graphql
  extend type Query {
    getComments(postId: ID!, parentId: ID, cursor: String, limit: Int): CommentResponse
  }

  extend type Mutation {
    addComment(postId: ID!, text: String!, parentId: ID): Comment!
    toggleCommentLike(commentId: ID!): CommentLikeResponse
  }

  type Comment {
    id: ID!
    text: String!
    author: Profile!
    post: Post!
    
    # Support for threaded replies
    parentId: ID
    replies: [Comment!]!
    repliesCount: Int!
    
    likesCount: Int!
    isLiked: Boolean
    
    createdAt: DateTime!
  }

  type CommentResponse {
    comments: [Comment!]!
    nextCursor: String
    hasMore: Boolean!
  }

  type CommentLikeResponse {
    id: ID
    isLiked: Boolean
    likesCount: Int
  }
`;
