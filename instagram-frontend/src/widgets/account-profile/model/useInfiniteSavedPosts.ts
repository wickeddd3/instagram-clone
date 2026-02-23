import { useQuery } from "@apollo/client/react";
import { GET_SAVED_POSTS } from "../api/query";
import type { SavedPosts } from "./types";
import { NetworkStatus } from "@apollo/client";

export const useInfiniteSavedPosts = () => {
  const { data, loading, error, fetchMore, networkStatus } =
    useQuery<SavedPosts>(GET_SAVED_POSTS, {
      variables: { cursor: null, limit: 5 },
      notifyOnNetworkStatusChange: true,
    });

  const {
    posts = [],
    hasMore = false,
    nextCursor = null,
  } = data?.getSavedPosts || {};

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
