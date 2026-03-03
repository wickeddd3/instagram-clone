import {
  ProfileMutation,
  ProfileQuery,
  ProfileResolvers,
  ProfileService,
  ProfileTypes,
} from "./modules/profile";
import {
  PostMutation,
  PostQuery,
  PostResolvers,
  PostService,
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
import { prisma } from "../lib/prisma";

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

export const services = {
  profile: new ProfileService(prisma),
  post: new PostService(prisma),
};
