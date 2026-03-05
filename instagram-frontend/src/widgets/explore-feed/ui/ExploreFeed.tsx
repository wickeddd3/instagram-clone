import { useInfiniteExploreFeed } from "../model/useInfiniteExploreFeed";
import { Spinner } from "@/shared/ui/Spinner";
import { PostThumbnail, type Post } from "@/entities/post";
import { usePostModal } from "@/widgets/post-modal";
import { ProfilePostsSkeleton } from "@/entities/profile";
import { VirtuosoGrid } from "react-virtuoso";

export const ExploreFeed = () => {
  const { posts, hasMore, loading, isLoadingMore, loadMore } =
    useInfiniteExploreFeed();

  const { openPostDetailsModal } = usePostModal();

  const handleOpenPostDetailsModal = (post: Post) => {
    openPostDetailsModal(post);
  };

  const handleLoadMore = () => {
    if (hasMore && !isLoadingMore) {
      loadMore();
    }
  };

  if (loading && !posts.length) {
    return <ProfilePostsSkeleton />;
  }

  return (
    <div className="h-full w-full max-w-5xl pt-4 md:p-8">
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
                  You've caught up with everything!
                </p>
              )}
            </div>
          ),
        }}
      />
    </div>
  );
};
