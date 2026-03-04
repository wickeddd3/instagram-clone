import { useInView } from "react-intersection-observer";
import { useInfiniteFeed } from "../model/useInfiniteFeed";
import { PostSkeleton } from "@/entities/post";
import { Spinner } from "@/shared/ui/Spinner";
import { FeedCard } from "./FeedCard";
import { useCallback, useMemo } from "react";

export const Feed = () => {
  const { posts, hasMore, loading, isLoadingMore, loadMore } =
    useInfiniteFeed();

  // Stable callback for the intersection observer
  const handleInViewChange = useCallback(
    (inView: boolean) => {
      if (inView && hasMore && !isLoadingMore) {
        loadMore();
      }
    },
    [hasMore, isLoadingMore, loadMore],
  );

  const { ref } = useInView({
    threshold: 0.1,
    onChange: handleInViewChange,
  });

  const renderedPosts = useMemo(() => {
    return posts.map((post) => <FeedCard key={post.id} post={post} />);
  }, [posts]);

  return (
    <div className="flex flex-col gap-8 py-8">
      {/* Show skeleton loaders while the initial posts are loading */}
      {loading && !posts.length && (
        <div className="w-full flex flex-col gap-8 p-2">
          {[...Array(8)].map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Render posts once loaded */}
      {renderedPosts}

      {/* Sentinel for Infinite Scrolling */}
      {hasMore && (
        <div
          ref={ref}
          className="w-full flex justify-center items-center py-4 mb-14"
        >
          <Spinner />
        </div>
      )}

      {/* No more posts message */}
      {!hasMore && posts.length > 0 && (
        <p className="text-gray-500 text-xs text-center py-4">
          You've caught up with everything!
        </p>
      )}
    </div>
  );
};
