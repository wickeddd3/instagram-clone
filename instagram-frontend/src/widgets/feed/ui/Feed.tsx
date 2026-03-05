import { useInfiniteFeed } from "../model/useInfiniteFeed";
import { PostSkeleton } from "@/entities/post";
import { Virtuoso } from "react-virtuoso";
import { FeedCard } from "./FeedCard";
import { Spinner } from "@/shared/ui/Spinner";
import { PullToRefresh } from "@/shared/ui/PullToRefresh";

export const Feed = () => {
  const { posts, hasMore, loading, isLoadingMore, loadMore, refetch } =
    useInfiniteFeed();

  const handleLoadMore = () => {
    if (hasMore && !isLoadingMore) {
      loadMore();
    }
  };

  const handleRefresh = async () => {
    await refetch({ cursor: null, limit: 5 });
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="flex-1 flex flex-col">
        {/* Show skeleton loaders while the initial posts are loading */}
        {loading && !posts.length && (
          <div className="w-full flex flex-col gap-8 p-2">
            {[...Array(8)].map((_, i) => (
              <PostSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Render posts once loaded */}
        <div className="h-full w-full max-w-[600px] mx-auto">
          <Virtuoso
            useWindowScroll
            totalCount={posts.length}
            data={posts}
            overscan={400} // Increase overscan to make scrolling feel smoother on fast swipes
            endReached={handleLoadMore} // Trigger loadMore when reaching the end
            itemContent={(index, post) => (
              <div key={index} className="pb-10 px-4 md:px-0">
                <FeedCard post={post} />
              </div>
            )} // The individual post renderer
            components={{
              Footer: () => (
                <div className="w-full flex flex-col items-center pb-10">
                  {hasMore ? (
                    <Spinner />
                  ) : (
                    <p className="text-gray-500 text-xs text-center">
                      You've caught up with everything!
                    </p>
                  )}
                </div>
              ),
            }} // Header/Footer components stay pinned to the list
          />
        </div>
      </div>
    </PullToRefresh>
  );
};
