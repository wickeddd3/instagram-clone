import { useQuery } from "@apollo/client/react";
import { GET_FEED } from "../api/query";
import type { Feed } from "./types";
import { NetworkStatus } from "@apollo/client";
import { useCallback } from "react";

export const useInfiniteFeed = (profileId: string) => {
  const { data, error, fetchMore, networkStatus, refetch } = useQuery<Feed>(
    GET_FEED,
    {
      variables: { profileId, cursor: null, limit: 5 },
      // Allows the loading state to update when fetchMore is called
      notifyOnNetworkStatusChange: true,
    },
  );

  const {
    posts = [],
    hasMore = false,
    nextCursor = null,
  } = data?.getFeedPosts || {};

  const loadMore = useCallback(() => {
    if (!hasMore || networkStatus === NetworkStatus.fetchMore) return;

    fetchMore({
      variables: { profileId, cursor: nextCursor },
    });
  }, [hasMore, nextCursor, fetchMore, networkStatus]);

  return {
    posts,
    hasMore,
    loading: networkStatus === NetworkStatus.loading, // Only true for initial load
    isLoadingMore: networkStatus === NetworkStatus.fetchMore,
    loadMore,
    refetch,
    error,
  };
};
