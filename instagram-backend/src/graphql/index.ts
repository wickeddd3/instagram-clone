import { ProfileMutation, ProfileQuery, ProfileResolvers, ProfileTypes } from "@/graphql/modules/profile";
import { PostMutation, PostQuery, PostResolvers, PostTypes } from "@/graphql/modules/post";
import { CommentMutation, CommentQuery, CommentResolvers, CommentTypes } from "@/graphql/modules/comment";
import { RecentSearchMutation, RecentSearchQuery, RecentSearchTypes } from "@/graphql/modules/recent-search";
import { StoryMutation, StoryQuery, StoryResolvers, StoryTypes } from "@/graphql/modules/story";

const BaseType = `#graphql
  scalar DateTime

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export const typeDefs = [BaseType, ProfileTypes, PostTypes, CommentTypes, RecentSearchTypes, StoryTypes];

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
