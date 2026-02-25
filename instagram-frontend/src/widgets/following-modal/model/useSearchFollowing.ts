import { useLazyQuery } from "@apollo/client/react";
import type { SearchFollowingResults } from "./types";
import { SEARCH_FOLLOWING } from "../api/query";

export const useSearchFollowing = ({ username }: { username: string }) => {
  const [searchFollowing, { data, loading, error, fetchMore }] =
    useLazyQuery<SearchFollowingResults>(SEARCH_FOLLOWING);

  const {
    following = [],
    hasMore = false,
    nextCursor = null,
  } = data?.searchFollowing || {};

  const loadMore = (query: string) => {
    if (!hasMore || loading) return;
    fetchMore({
      variables: { username, query, cursor: nextCursor, limit: 10 },
    });
  };

  return {
    following,
    hasMore,
    nextCursor,
    loading,
    error,
    loadMore,
    searchFollowing,
  };
};
