import { useQuery } from "@apollo/client/react";
import type { ProfilePostsData } from "../../types/post";
import { GET_PROFILE_POSTS } from "../../graphql/queries/post";
import { PostItem } from "./PostItem";
import { ProfilePostsSkeleton } from "../loaders/ProfilePostsSkeleton";
import { useEffect, useRef } from "react";
import { Loader } from "lucide-react";

export const Posts = ({ profileId }: { profileId: string }) => {
  const { loading, error, data, fetchMore } = useQuery<ProfilePostsData>(
    GET_PROFILE_POSTS,
    {
      variables: { profileId, cursor: null, limit: 9 },
      skip: !profileId,
    }
  );

  const {
    posts = [],
    hasMore = false,
    nextCursor = null,
  } = data?.getProfilePosts || {};

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only fetch more if there is more to fetch
    if (!sentinelRef.current || loading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMore({
            variables: { cursor: nextCursor, limit: 9 },
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
    <>
      {loading && !posts.length && <ProfilePostsSkeleton />}

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
    </>
  );
};
