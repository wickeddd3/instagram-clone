import { useQuery } from "@apollo/client/react";
import { GET_EXPLORE_POSTS } from "../graphql/queries/post";
import type { ExploreData } from "../types/post";
import { PostItem } from "../components/profile/PostItem";
import { useEffect, useRef } from "react";
import { Loader } from "lucide-react";

const ExplorePage = () => {
  const { data, loading, error, fetchMore } = useQuery<ExploreData>(
    GET_EXPLORE_POSTS,
    {
      variables: { cursor: null, limit: 9 },
    }
  );

  const {
    posts = [],
    hasMore = false,
    nextCursor = null,
  } = data?.getExplorePosts || {};

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only fetch more if there is more to fetch
    if (!sentinelRef.current || loading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMore({
            variables: { cursor: nextCursor },
          });
        }
      },
      { threshold: 0.8 }
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [nextCursor, hasMore, loading, fetchMore]);

  if (error) {
    return (
      <div className="flex w-full justify-center pt-20 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl flex flex-col pt-4 md:p-8">
      {loading && !posts.length && (
        <div className="flex w-full justify-center pt-20 text-white">
          Loading posts...
        </div>
      )}

      {!!posts.length && (
        <div className="grid grid-cols-3 gap-0.5">
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      )}

      {hasMore && (
        <div
          ref={sentinelRef}
          className="w-full flex justify-center items-center py-10 pb-5"
        >
          <Loader className="animate-spin text-gray-500" size={34} />
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <p className="text-gray-500 text-xs text-center py-10">
          You've caught up with everything!
        </p>
      )}
    </div>
  );
};

export default ExplorePage;
