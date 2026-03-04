import { useLazyQuery } from "@apollo/client/react";
import { GET_COMMENTS } from "../api/query";
import type { Comments } from "./types";
import { useCallback } from "react";

export const useInfiniteReply = () => {
  const [getComments, { data, loading, fetchMore }] =
    useLazyQuery<Comments>(GET_COMMENTS);

  const {
    comments = [],
    hasMore = false,
    nextCursor = null,
  } = data?.getComments || {};

  const loadMore = useCallback(() => {
    if (!hasMore || loading) return;
    fetchMore({
      variables: { cursor: nextCursor, limit: 5 },
    });
  }, [hasMore, loading, nextCursor]);

  return {
    comments,
    hasMore,
    loading,
    loadMore,
    getComments,
  };
};
