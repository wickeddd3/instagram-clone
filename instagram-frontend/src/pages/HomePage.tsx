import { Stories } from "../components/Stories";
import { Post } from "../components/posts/Post";
import { GET_FEED_POSTS } from "../graphql/queries/post";
import { useQuery } from "@apollo/client/react";
import type { FeedPostsdData } from "../types/post";
import { AuthUser } from "../components/AuthUser";
import { SuggestionsSidebar } from "../components/layouts/SuggestionsSidebar";
import { PostSkeleton } from "../components/loaders/PostSkeleton";
import { useEffect, useRef } from "react";
import { Loader } from "lucide-react";

const HomePage = () => {
  const { data, loading, error, fetchMore } = useQuery<FeedPostsdData>(
    GET_FEED_POSTS,
    {
      variables: { cursor: null, limit: 5 },
    }
  );

  const {
    posts = [],
    hasMore = false,
    nextCursor = null,
  } = data?.getFeedPosts || {};

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
    <div className="flex w-full max-w-5xl">
      {/* Central Feed Column */}
      <div className="w-full lg:w-[630px] flex flex-col gap-4 pt-4">
        <Stories />

        {loading && !posts.length && (
          <div className="w-full flex flex-col gap-8">
            {[...Array(8)].map((_, i) => (
              <PostSkeleton key={i} />
            ))}
          </div>
        )}

        {!!posts.length && (
          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* The Sentinel / Loading Indicator */}
        {/* Only show the sentinel/loader if there's more content expected */}
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

      {/* Right Sidebar - Suggestions (Desktop Only) */}
      <div className="hidden w-[320px] pl-16 pt-10 lg:flex flex-col gap-6">
        {/* Current User */}
        <AuthUser />

        {/* Suggestion List */}
        <SuggestionsSidebar />

        {/* Footer Links */}
        <div className="mt-8 text-xs text-gray-500 space-y-4">
          <p>About · Help · Press · API · Jobs · Privacy · Terms</p>
          <p>© 2023 INSTAGRAM FROM META</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
