import { Camera } from "lucide-react";
import { useInfinitePosts } from "../model/useInfinitePosts";
import { Posts } from "./Posts";
import { PostsEmpty } from "./PostsEmpty";
import { memo, useMemo } from "react";

export const ProfilePosts = memo(({ profileId }: { profileId: string }) => {
  const { posts, hasMore, loading, isLoadingMore, loadMore } = useInfinitePosts(
    { profileId },
  );

  const hadEmptyPosts = useMemo(() => posts.length === 0, [posts]);

  return !loading && hadEmptyPosts ? (
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
});

ProfilePosts.displayName = "ProfilePosts";
