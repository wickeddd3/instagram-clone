import { prisma } from "@/lib/prisma";
import { ProfileService } from "@/services/profile.service";
import { PostService } from "@/services/post.service";
import { CommentService } from "@/services/comment.service";
import { RecentSearchService } from "@/services/recent-search.service";
import { StoryService } from "@/services/story.service";
import { AccountService } from "@/services/account.service";
import type { PrismaClient } from "@/prisma/client";

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
