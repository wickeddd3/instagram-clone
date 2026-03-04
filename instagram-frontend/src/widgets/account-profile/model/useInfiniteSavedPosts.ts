import { useQuery } from "@apollo/client/react";
import { GET_SAVED_POSTS } from "../api/query";
import type { SavedPosts } from "./types";
import { NetworkStatus } from "@apollo/client";
import { useCallback } from "react";

export const useInfiniteSavedPosts = ({ profileId }: { profileId: string }) => {
  const { data, error, fetchMore, networkStatus } = useQuery<SavedPosts>(
    GET_SAVED_POSTS,
    {
      variables: { profileId, cursor: null, limit: 5 },
      skip: !profileId,
      notifyOnNetworkStatusChange: true,
    },
  );

  const {
    posts = [],
    hasMore = false,
    nextCursor = null,
  } = data?.getSavedPosts || {};

  const loadMore = useCallback(() => {
    if (!hasMore || networkStatus === NetworkStatus.fetchMore) return;

    fetchMore({
      variables: { cursor: nextCursor },
    });
  }, [hasMore, nextCursor, fetchMore, networkStatus]);

  return {
    posts,
    hasMore,
    loading: networkStatus === NetworkStatus.loading, // Only true for initial load
    isLoadingMore: networkStatus === NetworkStatus.fetchMore,
    loadMore,
    error,
  };
};
