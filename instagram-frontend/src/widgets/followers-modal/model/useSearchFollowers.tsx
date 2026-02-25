import { useLazyQuery } from "@apollo/client/react";
import type { SearchFollowersResults } from "./types";
import { SEARCH_FOLLOWERS } from "../api/query";

export const useSearchFollowers = ({ username }: { username: string }) => {
  const [searchFollowers, { data, loading, error, fetchMore }] =
    useLazyQuery<SearchFollowersResults>(SEARCH_FOLLOWERS);

  const {
    followers = [],
    hasMore = false,
    nextCursor = null,
  } = data?.searchFollowers || {};

  const loadMore = (query: string) => {
    if (!hasMore || loading) return;
    fetchMore({
      variables: { username, query, cursor: nextCursor, limit: 10 },
    });
  };

  return {
    followers,
    hasMore,
    nextCursor,
    loading,
    error,
    loadMore,
    searchFollowers,
  };
};
