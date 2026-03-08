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
  CommentService,
  CommentTypes,
} from "./modules/comment";
import {
  RecentSearchMutation,
  RecentSearchQuery,
  RecentSearchService,
  RecentSearchTypes,
} from "./modules/recent-search";
import {
  StoryMutation,
  StoryQuery,
  StoryResolvers,
  StoryService,
  StoryTypes,
} from "./modules/story";

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
  StoryTypes,
];

export const resolvers = {
  Query: {
    ...ProfileQuery,
    ...PostQuery,
    ...CommentQuery,
    ...RecentSearchQuery,
    ...StoryQuery,
  },
  Mutation: {
    ...ProfileMutation,
    ...PostMutation,
    ...CommentMutation,
    ...RecentSearchMutation,
    ...StoryMutation,
  },
  Profile: ProfileResolvers,
  Post: PostResolvers,
  Comment: CommentResolvers,
  Story: StoryResolvers,
};

export const services = {
  profile: new ProfileService(prisma),
  post: new PostService(prisma),
  comment: new CommentService(prisma),
  recentSearch: new RecentSearchService(prisma),
  story: new StoryService(prisma),
};
