export const typeDefs = `#graphql
  scalar DateTime

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
    id: ID
    isLiked: Boolean
    likesCount: Int
  }

  type PostSaveResponse {
    id: ID
    isSaved: Boolean
  }

  # --- Queries ---

  type Query {
    # Feed and Discovery
    getFeedPosts(cursor: String, limit: Int): FeedResponse
    getExplorePosts(cursor: String, limit: Int): FeedResponse
    getPost(id: ID!): Post

    
    # Profile
    getProfile(username: String!): Profile
    getProfileById(id: ID!): Profile
    getProfilePosts(profileId: ID!, cursor: String, limit: Int): FeedResponse
    getSavedPosts(cursor: String, limit: Int): FeedResponse
    searchProfiles(query: String!): [Profile!]!
    getRecentSearches: [Profile!]!
    getSuggestedProfiles(limit: Int): [Profile!]!
    
    # Comments
    getComments(postId: ID!, parentId: ID, limit: Int, offset: Int): [Comment!]!

    # Follows
    getFollowers(username: String!): [Profile!]!
    getFollowing(username: String!): [Profile!]!
  }

  # --- Mutations ---

  type Mutation {
    # Account
    createProfile(id: ID!, username: String!, email: String!, displayName: String!): Profile
    updateProfile(displayName: String, bio: String, website: String): Profile!
    uploadProfileAvatar(avatarUrl: String!): Profile!
    removeProfileAvatar: Profile!
    toggleFollow(username: String!): Boolean!
    removeFollower(username: String!): Boolean!
    removeFollowing(username: String!): Boolean!

    # Content Creation
    createPost(imageUrl: String!, caption: String, location: String): Post!
    deletePost(postId: ID!): Boolean!
    savePost(postId: ID!): Boolean!
    unsavePost(postId: ID!): Boolean!

    # Interaction
    togglePostLike(postId: ID!): PostLikeResponse
    togglePostSave(postId: ID!): PostSaveResponse
    toggleCommentLike(commentId: ID!): Boolean!
    addComment(postId: ID!, text: String!, parentId: ID): Comment!
    deleteComment(commentId: ID!): Boolean!

    # Activity
    addRecentSearch(targetId: ID!): Boolean!
    removeRecentSearch(targetId: ID!): Boolean!
    clearRecentSearches: Boolean!
  }

  # --- Subscriptions (Real-time) ---

  type Subscription {
    postAdded: Post!
    notificationReceived: Notification! # For likes/comments/follows
  }

  type Notification {
    id: ID!
    type: NotificationType!
    actor: Profile!
    post: Post
    comment: Comment
    createdAt: DateTime!
  }

  enum NotificationType {
    LIKE_POST
    LIKE_COMMENT
    COMMENT
    REPLY
    FOLLOW
  }
`;
