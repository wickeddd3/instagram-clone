import { useQuery } from "@apollo/client/react";
import type { Following } from "./types";
import { GET_FOLLOWING } from "../api/query";

export const useInfiniteFollowing = ({ username }: { username: string }) => {
  const { data, loading, error, fetchMore, networkStatus } =
    useQuery<Following>(GET_FOLLOWING, {
      variables: { username, cursor: null, limit: 10 },
      notifyOnNetworkStatusChange: true,
      skip: !username,
    });

  const {
    following = [],
    hasMore = false,
    nextCursor = null,
  } = data?.getFollowing || {};

  const loadMore = () => {
    if (!hasMore || loading) return;
    fetchMore({
      variables: { username, cursor: nextCursor, limit: 10 },
    });
  };

  return {
    following,
    hasMore,
    nextCursor,
    loading,
    error,
    isLoadingMore: networkStatus === 6 || networkStatus === 3,
    loadMore,
  };
};
