import { Bookmark } from "lucide-react";
import { useInfiniteSavedPosts } from "../model/useInfiniteSavedPosts";
import { Posts } from "./Posts";
import { PostsEmpty } from "./PostsEmpty";
import { memo, useMemo } from "react";
import type { Post } from "@/entities/post";

export const SavedPosts = memo(({
    profileId,
    onOpenPost,
  }: {
    profileId: string;
    onOpenPost: (posts: Post[], index: number) => void;
  }) => {
  const { posts, hasMore, loading, isLoadingMore, loadMore } =
    useInfiniteSavedPosts({ profileId });

  const hadEmptyPosts = useMemo(() => posts.length === 0, [posts]);

  return !loading && hadEmptyPosts ? (
    <PostsEmpty
      icon={<Bookmark size={44} strokeWidth={1} aria-hidden="true" />}
      title="No saved posts"
    />
  ) : (
    <Posts
      posts={posts}
      hasMore={hasMore}
      loading={loading}
      isLoadingMore={isLoadingMore}
      loadMore={loadMore}
      onOpenPost={onOpenPost}
    />
  );
});

SavedPosts.displayName = "SavedPosts";
