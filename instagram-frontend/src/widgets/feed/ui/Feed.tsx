import { useInfiniteFeed } from "../model/useInfiniteFeed";
import { PostSkeleton } from "@/entities/post";
import { List, useDynamicRowHeight } from "react-window";
import { AutoSizer } from "react-virtualized-auto-sizer";
import { FeedCardRow } from "./FeedCardRow";
import { useMemo } from "react";

export const Feed = () => {
  const { posts, hasMore, loading, isLoadingMore, loadMore } =
    useInfiniteFeed();

  const rowHeight = useDynamicRowHeight({
    defaultRowHeight: 700,
  });

  const rowCount = useMemo(() => {
    if (posts.length === 0) return 0;
    // If we have more to load, +1 for Spinner.
    return posts.length + 1;
  }, [posts.length]);

  const handleRowsRendered = ({ stopIndex }: { stopIndex: number }) => {
    if (hasMore && !isLoadingMore && stopIndex === posts.length - 1) {
      loadMore();
    }
  };

  return (
    <div className="flex flex-col">
      {/* Show skeleton loaders while the initial posts are loading */}
      {loading && !posts.length && (
        <div className="w-full flex flex-col gap-8 p-2">
          {[...Array(8)].map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Render posts once loaded */}
      <div className="h-[calc(100vh-184px)] w-full max-w-[600px] mx-auto overflow-hidden bg-transparent">
        <AutoSizer
          renderProp={({ height, width }) => (
            <List
              style={{
                height: height,
                width: width,
              }}
              rowHeight={rowHeight}
              rowCount={rowCount}
              rowComponent={FeedCardRow}
              rowProps={{ posts, hasMore }}
              onRowsRendered={handleRowsRendered}
              overscanCount={2}
              className="no-scrollbar"
            />
          )}
        />
      </div>

      {/* No more posts message */}
      {!hasMore && posts.length > 0 && (
        <p className="text-gray-500 text-xs text-center py-4">
          You've caught up with everything!
        </p>
      )}
    </div>
  );
};
