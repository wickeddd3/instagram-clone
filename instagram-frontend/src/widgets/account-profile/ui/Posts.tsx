import { NoMorePosts, PostThumbnail, type Post } from "@/entities/post";
import { Spinner } from "@/shared/ui/Spinner";
import { ProfilePostsSkeleton } from "@/entities/profile";
import { usePostNavigationModal } from "@/widgets/post-modal";
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
    const { openPostDetailsNavigationModal } = usePostNavigationModal();

    const handleOpenPostDetailsModal = useCallback(
      (posts: Post[], index: number) => {
        openPostDetailsNavigationModal(posts, index);
      },
      [openPostDetailsNavigationModal],
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
