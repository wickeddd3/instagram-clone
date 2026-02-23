import { useInView } from "react-intersection-observer";
import { useInfiniteExploreFeed } from "../model/useInfiniteExploreFeed";
import { Spinner } from "@/shared/ui/Spinner";
import { PostThumbnail, type Post } from "@/entities/post";
import { usePostModal } from "@/widgets/post-modal";
import { ProfilePostsSkeleton } from "@/entities/profile";

export const ExploreFeed = () => {
  const { posts, hasMore, loading, isLoadingMore, loadMore } =
    useInfiniteExploreFeed();

  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && hasMore && !isLoadingMore) loadMore();
    },
  });

  const { openPostDetailsModal } = usePostModal();

  const handleOpenPostDetailsModal = (post: Post) => {
    openPostDetailsModal(post);
  };

  return (
    <div className="w-full max-w-5xl flex flex-col pt-4 md:p-8">
      {/* Show skeletons while loading initial posts */}
      {loading && !posts.length && <ProfilePostsSkeleton />}

      {/* Render posts once loaded */}
      {!!posts.length && (
        <div className="grid grid-cols-3 gap-0.5">
          {posts.map((post) => (
            <PostThumbnail
              key={post.id}
              post={post}
              onClick={() => handleOpenPostDetailsModal(post)}
            />
          ))}
        </div>
      )}

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
