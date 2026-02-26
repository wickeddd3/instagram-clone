import { Camera } from "lucide-react";
import { useInfinitePosts } from "../model/useInfinitePosts";
import { Posts } from "./Posts";
import { PostsEmpty } from "./PostsEmpty";

export const ProfilePosts = ({ profileId }: { profileId: string }) => {
  const { posts, hasMore, loading, isLoadingMore, loadMore } = useInfinitePosts(
    { profileId },
  );

  return !loading && posts.length === 0 ? (
    <PostsEmpty
      icon={<Camera size={44} strokeWidth={1} />}
      title="No posts yet"
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
