import { useInView } from "react-intersection-observer";
import { PostThumbnail, type Post } from "@/entities/post";
import { Spinner } from "@/shared/ui/Spinner";
import { ProfilePostsSkeleton } from "@/entities/profile";
import { usePostModal } from "@/widgets/post-modal";
import { memo, useCallback, useMemo } from "react";

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
    const handleInViewChange = useCallback(
      (inView: boolean) => {
        if (inView && hasMore && !isLoadingMore) {
          loadMore();
        }
      },
      [hasMore, isLoadingMore, loadMore],
    );

    const { ref } = useInView({
      onChange: handleInViewChange,
    });

    const { openPostDetailsModal } = usePostModal();

    const handleOpenPostDetailsModal = useCallback(
      (post: Post) => {
        openPostDetailsModal(post);
      },
      [openPostDetailsModal],
    );

    const renderedGrid = useMemo(
      () => (
        <div className="grid grid-cols-3 gap-0.5">
          {posts.map((post) => (
            <PostThumbnail
              key={post.id}
              post={post}
              onClick={() => handleOpenPostDetailsModal(post)}
            />
          ))}
        </div>
      ),
      [posts, handleOpenPostDetailsModal],
    );

    return (
      <>
        {/* Show skeletons while loading initial posts */}
        {loading && !posts.length && <ProfilePostsSkeleton />}

        {/* Render posts once loaded */}
        {!!posts.length && renderedGrid}

        {/* Sentinel for Infinite Scrolling */}
        {hasMore && (
          <div
            ref={ref}
            className="w-full flex justify-center items-center py-4 mb-14"
          >
            <Spinner />
          </div>
        )}
      </>
    );
  },
);

Posts.displayName = "Posts";
