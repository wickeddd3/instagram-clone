import { Bookmark } from "lucide-react";
import { useInfiniteSavedPosts } from "../model/useInfiniteSavedPosts";
import { Posts } from "./Posts";
import { PostsEmpty } from "./PostsEmpty";

export const SavedPosts = () => {
  const { posts, hasMore, loading, isLoadingMore, loadMore } =
    useInfiniteSavedPosts();

  return !loading && posts.length === 0 ? (
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
};
