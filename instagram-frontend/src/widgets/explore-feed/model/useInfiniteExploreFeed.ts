import { useQuery } from "@apollo/client/react";
import { GET_EXPLORE_POSTS } from "../api/query";
import type { ExplorePosts } from "./types";
import { NetworkStatus } from "@apollo/client";

export const useInfiniteExploreFeed = (profileId: string) => {
  const { data, loading, error, fetchMore, networkStatus, refetch } =
    useQuery<ExplorePosts>(GET_EXPLORE_POSTS, {
      variables: { profileId, cursor: null, limit: 9 },
      notifyOnNetworkStatusChange: true, // Important for loading state during fetchMore
    });

  const {
    posts = [],
    hasMore = false,
    nextCursor = null,
  } = data?.getExplorePosts || {};

  const loadMore = () => {
    if (!hasMore || loading) return;
    fetchMore({
      variables: { profileId, cursor: nextCursor },
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
    refetch,
  };
};
