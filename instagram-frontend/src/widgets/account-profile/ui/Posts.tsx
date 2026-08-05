import { NoMorePosts, PostThumbnail, type Post } from "@/entities/post";
import { Spinner } from "@/shared/ui";
import { ProfilePostsSkeleton } from "@/entities/profile";
import { memo, useCallback } from "react";
import { VirtuosoGrid } from "react-virtuoso";

export const Posts = memo(
  ({
    posts,
    loading,
    hasMore,
    isLoadingMore,
    loadMore,
    onOpenPost,
  }: {
    posts: Post[];
    loading: boolean;
    hasMore: boolean;
    isLoadingMore: boolean;
    loadMore: () => void;
    onOpenPost: (posts: Post[], index: number) => void;
  }) => {
    const handleOpenPostDetailsModal = useCallback(
      (posts: Post[], index: number) => {
        onOpenPost(posts, index);
      },
      [onOpenPost],
    );

    const handleLoadMore = () => {
      if (hasMore && !isLoadingMore) {
        loadMore();
      }
    };

    if (loading && !posts.length) {
      return <ProfilePostsSkeleton />;
    }

    return (
      <div className="h-full w-full">
        <VirtuosoGrid
          useWindowScroll
          totalCount={posts.length}
          data={posts}
          overscan={200}
          endReached={handleLoadMore}
          listClassName="grid grid-cols-3 gap-0.5"
          itemContent={(index, post) => (
            <PostThumbnail
              key={index}
              post={post}
              onClick={() => handleOpenPostDetailsModal(posts, index)}
            />
          )}
          components={{
            Footer: () => (
              <div className="w-full flex flex-col items-center py-10">
                {hasMore ? <Spinner /> : posts.length > 10 && <NoMorePosts />}
              </div>
            ),
          }}
        />
      </div>
    );
  },
);

Posts.displayName = "Posts";
