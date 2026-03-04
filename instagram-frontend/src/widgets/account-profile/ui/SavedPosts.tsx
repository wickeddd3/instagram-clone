import { Bookmark } from "lucide-react";
import { useInfiniteSavedPosts } from "../model/useInfiniteSavedPosts";
import { Posts } from "./Posts";
import { PostsEmpty } from "./PostsEmpty";
import { memo, useMemo } from "react";

export const SavedPosts = memo(({ profileId }: { profileId: string }) => {
  const { posts, hasMore, loading, isLoadingMore, loadMore } =
    useInfiniteSavedPosts({ profileId });

  const hadEmptyPosts = useMemo(() => posts.length === 0, [posts]);

  return !loading && hadEmptyPosts ? (
    <PostsEmpty
      icon={<Bookmark size={44} strokeWidth={1} />}
      title="No saved posts"
    />
  ) : (
    <Posts
      posts={posts}
      hasMore={hasMore}
      loading={loading}
      isLoadingMore={isLoadingMore}
      loadMore={loadMore}
    />
  );
});

SavedPosts.displayName = "SavedPosts";
