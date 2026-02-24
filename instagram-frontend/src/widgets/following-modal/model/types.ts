import type { Profile } from "@/entities/profile";

export interface Following {
  getFollowing: {
    following: Profile[];
    hasMore: boolean;
    nextCursor: string;
  };
}
