import { useInfiniteExploreFeed } from "../model/useInfiniteExploreFeed";
import { Spinner } from "@/shared/ui/Spinner";
import { NoMorePosts, PostThumbnail, type Post } from "@/entities/post";
import { usePostNavigationModal } from "@/widgets/post-modal";
import { ProfilePostsSkeleton } from "@/entities/profile";
import { VirtuosoGrid } from "react-virtuoso";
import { PullToRefresh } from "@/shared/ui/PullToRefresh";
import { useAuth } from "@/app/providers/AuthContext";

export const ExploreFeed = () => {
  const { authUser } = useAuth();

  const { posts, hasMore, loading, isLoadingMore, loadMore, refetch } =
    useInfiniteExploreFeed(authUser?.id || "");

  const { openPostDetailsNavigationModal } = usePostNavigationModal();

  const handleOpenPostDetailsModal = (posts: Post[], index: number) => {
    openPostDetailsNavigationModal(posts, index);
  };

  const handleLoadMore = () => {
    if (hasMore && !isLoadingMore) {
      loadMore();
    }
  };

  const handleRefresh = async () => {
    await refetch({ cursor: null, limit: 9 });
  };

  if (loading && !posts.length) {
    return <ProfilePostsSkeleton />;
  }

  return (
    <div className="h-full w-full max-w-5xl pt-4 md:p-8">
      <PullToRefresh onRefresh={handleRefresh}>
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
                {hasMore ? <Spinner /> : posts.length > 20 && <NoMorePosts />}
              </div>
            ),
          }}
        />
      </PullToRefresh>
    </div>
  );
};
