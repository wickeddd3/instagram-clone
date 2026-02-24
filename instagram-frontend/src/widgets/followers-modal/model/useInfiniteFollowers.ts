import { useQuery } from "@apollo/client/react";
import type { Followers } from "./types";
import { GET_FOLLOWERS } from "../api/query";

export const useInfiniteFollowers = ({ username }: { username: string }) => {
  const { data, loading, error, fetchMore, networkStatus } =
    useQuery<Followers>(GET_FOLLOWERS, {
      variables: { username, cursor: null, limit: 10 },
      notifyOnNetworkStatusChange: true,
      skip: !username,
    });

  const {
    followers = [],
    hasMore = false,
    nextCursor = null,
  } = data?.getFollowers || {};

  const loadMore = () => {
    if (!hasMore || loading) return;
    fetchMore({
      variables: { username, cursor: nextCursor, limit: 10 },
    });
  };

  return {
    followers,
    hasMore,
    nextCursor,
    loading,
    error,
    isLoadingMore: networkStatus === 6 || networkStatus === 3,
    loadMore,
  };
};
