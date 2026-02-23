import type { Post } from "@/entities/post";
import type { Profile } from "@/entities/profile";

export interface ProfileByUsername {
  getProfile: Profile;
}

export interface SavedPosts {
  getSavedPosts: {
    posts: Post[];
    hasMore: boolean;
    nextCursor: string;
  };
}

export interface ProfilePosts {
  getProfilePosts: {
    posts: Post[];
    hasMore: boolean;
    nextCursor: string;
  };
}
