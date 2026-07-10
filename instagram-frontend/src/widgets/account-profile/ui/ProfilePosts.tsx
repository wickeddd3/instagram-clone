import { Camera } from "lucide-react";
import { useInfinitePosts } from "../model/useInfinitePosts";
import { Posts } from "./Posts";
import { PostsEmpty } from "./PostsEmpty";
import { memo, useMemo } from "react";
import type { Post } from "@/entities/post";

export const ProfilePosts = memo(({
    profileId,
    onOpenPost,
  }: {
    profileId: string;
    onOpenPost: (posts: Post[], index: number) => void;
  }) => {
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
      onOpenPost={onOpenPost}
    />
  );
});

ProfilePosts.displayName = "ProfilePosts";
