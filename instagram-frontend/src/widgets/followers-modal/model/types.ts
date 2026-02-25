import type { Profile } from "@/entities/profile";

export interface Followers {
  getFollowers: {
    followers: Profile[];
    hasMore: boolean;
    nextCursor: string;
  };
}

export interface SearchFollowersResults {
  searchFollowers: {
    followers: Profile[];
    hasMore: boolean;
    nextCursor: string;
  };
}
