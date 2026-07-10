import type { ProfileService } from "./modules/profile/service";
import type { PostService } from "./modules/post/service";
import type { CommentService } from "./modules/comment/service";
import type { RecentSearchService } from "./modules/recent-search/service";
import type { StoryService } from "./modules/story/service";

/**
 * The data-access services injected into every resolver via the Apollo context.
 * Mirrors the `services` object assembled in `./index.ts`.
 */
export interface Services {
  profile: ProfileService;
  post: PostService;
  comment: CommentService;
  recentSearch: RecentSearchService;
  story: StoryService;
}

/**
 * Per-request GraphQL context built in `src/index.ts`. `userId` is the Supabase
 * user UUID when the request carries a valid token, otherwise `null`.
 */
export interface GraphQLContext {
  userId: string | null;
  services: Services;
}
