import type { Profile } from "@/entities/profile";

export interface Following {
  getFollowing: {
    following: Profile[];
    hasMore: boolean;
    nextCursor: string;
  };
}

export interface SearchFollowingResults {
  searchFollowing: {
    following: Profile[];
    hasMore: boolean;
    nextCursor: string;
  };
}
