import { PostThumbnail, type Post } from "@/entities/post";
import { Spinner } from "@/shared/ui/Spinner";
import { ProfilePostsSkeleton } from "@/entities/profile";
import { usePostModal } from "@/widgets/post-modal";
import { memo, useCallback } from "react";
import { VirtuosoGrid } from "react-virtuoso";

export const Posts = memo(
  ({
    posts,
    loading,
    hasMore,
    isLoadingMore,
    loadMore,
  }: {
    posts: Post[];
    loading: boolean;
    hasMore: boolean;
    isLoadingMore: boolean;
    loadMore: () => void;
  }) => {
    const { openPostDetailsModal } = usePostModal();

    const handleOpenPostDetailsModal = useCallback(
      (post: Post) => {
        openPostDetailsModal(post);
      },
      [openPostDetailsModal],
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
              onClick={() => handleOpenPostDetailsModal(post)}
            />
          )}
          components={{
            Footer: () => (
              <div className="w-full flex flex-col items-center py-10">
                {hasMore ? (
                  <Spinner />
                ) : (
                  <p className="text-gray-500 text-xs text-center">
                    No more posts to show
                  </p>
                )}
              </div>
            ),
          }}
        />
      </div>
    );
  },
);

Posts.displayName = "Posts";
