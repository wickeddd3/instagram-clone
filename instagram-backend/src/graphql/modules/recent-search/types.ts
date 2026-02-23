export const RecentSearchTypes = `#graphql
  extend type Query {
    getRecentSearches: [Profile!]!
  }

  extend type Mutation {
    addRecentSearch(targetId: ID!): String!
    removeRecentSearch(targetId: ID!): String!
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
