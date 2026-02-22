import { useQuery } from "@apollo/client/react";
import { GET_PROFILE_POSTS } from "../api/query";
import type { ProfilePosts } from "./types";
import { NetworkStatus } from "@apollo/client";

export const useInfinitePosts = ({ profileId }: { profileId: string }) => {
  const { data, loading, error, fetchMore, networkStatus } =
    useQuery<ProfilePosts>(GET_PROFILE_POSTS, {
      variables: { profileId, cursor: null, limit: 5 },
      skip: !profileId,
      notifyOnNetworkStatusChange: true,
    });

  const {
    posts = [],
    hasMore = false,
    nextCursor = null,
  } = data?.getProfilePosts || {};

  const loadMore = () => {
    if (!hasMore || loading) return;
    fetchMore({
      variables: { cursor: nextCursor },
    });
  };

  return {
    posts,
    hasMore,
    nextCursor,
    loading,
    error,
    isLoadingMore: networkStatus === NetworkStatus.refetch, // Indicates loading state during fetchMore
    loadMore,
  };
};
