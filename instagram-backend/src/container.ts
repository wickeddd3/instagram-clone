import { prisma } from "./lib/prisma";
import { ProfileService } from "./graphql/modules/profile/service";
import { PostService } from "./graphql/modules/post/service";
import { CommentService } from "./graphql/modules/comment/service";
import { RecentSearchService } from "./graphql/modules/recent-search/service";
import { StoryService } from "./graphql/modules/story/service";
import { AccountService } from "./services/account.service";
// Resolves to prisma/generated/client via the tsconfig rootDirs merge.
import type { PrismaClient } from "./client";

/**
 * The data-access services. Every transport (GraphQL today, REST next) depends
 * on this container rather than on the GraphQL layer, so business logic stays
 * transport-agnostic.
 */
export interface Services {
  profile: ProfileService;
  post: PostService;
  comment: CommentService;
  recentSearch: RecentSearchService;
  story: StoryService;
  account: AccountService;
}

// Factory form so tests can inject a mock/isolated Prisma client.
export const createServices = (client: PrismaClient = prisma): Services => ({
  profile: new ProfileService(client),
  post: new PostService(client),
  comment: new CommentService(client),
  recentSearch: new RecentSearchService(client),
  story: new StoryService(client),
  account: new AccountService(client),
});

// Shared singleton used by the running server.
export const services = createServices();
