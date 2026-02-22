import { useInfinitePosts } from "../model/useInfinitePosts";
import { Posts } from "./Posts";

export const ProfilePosts = ({ profileId }: { profileId: string }) => {
  const { posts, hasMore, loading, isLoadingMore, loadMore } = useInfinitePosts(
    { profileId },
  );

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
