import { useInView } from "react-intersection-observer";
import { PostThumbnail, type Post } from "@/entities/post";
import { Spinner } from "@/shared/ui/Spinner";
import { ProfilePostsSkeleton } from "@/entities/profile";
import { usePostModal } from "@/widgets/post-modal";

export const Posts = ({
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
    <>
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
    </>
  );
};
