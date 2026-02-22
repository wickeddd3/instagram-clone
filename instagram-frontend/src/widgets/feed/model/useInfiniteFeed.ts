import { useQuery } from "@apollo/client/react";
import { GET_FEED } from "../api/query";
import type { Feed } from "./types";
import { NetworkStatus } from "@apollo/client";

export const useInfiniteFeed = () => {
  const { data, loading, error, fetchMore, networkStatus } = useQuery<Feed>(
    GET_FEED,
    {
      variables: { cursor: null, limit: 5 },
      notifyOnNetworkStatusChange: true, // Important for loading state during fetchMore
    },
  );

  const {
    posts = [],
    hasMore = false,
    nextCursor = null,
  } = data?.getFeedPosts || {};

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
