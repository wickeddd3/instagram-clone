import { useInfiniteSavedPosts } from "../model/useInfiniteSavedPosts";
import { Posts } from "./Posts";

export const SavedPosts = () => {
  const { posts, hasMore, loading, isLoadingMore, loadMore } =
    useInfiniteSavedPosts();

  return (
    <Posts
      posts={posts}
      hasMore={hasMore}
      loading={loading}
      isLoadingMore={isLoadingMore}
      loadMore={loadMore}
    />
  );
};
