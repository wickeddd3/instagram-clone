import { useLazyQuery } from "@apollo/client/react";
import { GET_COMMENTS } from "../api/query";
import type { Comments } from "./types";

export const useInfiniteReply = () => {
  const [getComments, { data, loading, error, fetchMore }] =
    useLazyQuery<Comments>(GET_COMMENTS);

  const {
    comments = [],
    hasMore = false,
    nextCursor = null,
  } = data?.getComments || {};

  const loadMore = () => {
    if (!hasMore || loading) return;
    fetchMore({
      variables: { cursor: nextCursor, limit: 5 },
    });
  };

  return {
    comments,
    hasMore,
    nextCursor,
    loading,
    error,
    loadMore,
    getComments,
  };
};
