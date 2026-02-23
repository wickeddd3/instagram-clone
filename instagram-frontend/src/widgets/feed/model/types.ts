import type { Post } from "@/entities/post";

export interface Feed {
  getFeedPosts: {
    posts: Post[];
    hasMore: boolean;
    nextCursor: string;
  };
}
