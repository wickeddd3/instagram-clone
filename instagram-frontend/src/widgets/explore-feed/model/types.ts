import type { Post } from "@/entities/post";

export interface ExplorePosts {
  getExplorePosts: {
    posts: Post[];
    hasMore: boolean;
    nextCursor: string;
  };
}
