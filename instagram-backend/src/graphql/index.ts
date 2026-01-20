import {
  ProfileMutation,
  ProfileQuery,
  ProfileResolvers,
  ProfileTypes,
} from "./modules/profile";
import {
  PostMutation,
  PostQuery,
  PostResolvers,
  PostTypes,
} from "./modules/post";
import {
  CommentMutation,
  CommentQuery,
  CommentResolvers,
  CommentTypes,
} from "./modules/comment";
import {
  RecentSearchMutation,
  RecentSearchQuery,
  RecentSearchTypes,
} from "./modules/recent-search";

const BaseType = `#graphql
  scalar DateTime

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export const typeDefs = [
  BaseType,
  ProfileTypes,
  PostTypes,
  CommentTypes,
  RecentSearchTypes,
];

export const resolvers = {
  Query: {
    ...ProfileQuery,
    ...PostQuery,
    ...CommentQuery,
    ...RecentSearchQuery,
  },
  Mutation: {
    ...ProfileMutation,
    ...PostMutation,
    ...CommentMutation,
    ...RecentSearchMutation,
  },
  Profile: ProfileResolvers,
  Post: PostResolvers,
  Comment: CommentResolvers,
};
