import { useQuery } from "@apollo/client/react";
import { GET_COMMENTS } from "../api/query";
import type { Comments } from "./types";
import { NetworkStatus } from "@apollo/client";
import { useCallback } from "react";

export const useInfiniteComment = ({ postId }: { postId: string }) => {
  const { data, fetchMore, networkStatus } = useQuery<Comments>(GET_COMMENTS, {
    variables: { postId },
    skip: !postId,
    notifyOnNetworkStatusChange: true,
  });

  const {
    comments = [],
    hasMore = false,
    nextCursor = null,
  } = data?.getComments || {};

  const loadMore = useCallback(() => {
    if (!hasMore || networkStatus === NetworkStatus.fetchMore) return;
    fetchMore({
      variables: { cursor: nextCursor },
    });
  }, [hasMore, nextCursor, fetchMore, networkStatus]);

  return {
    comments,
    hasMore,
    loading: networkStatus === NetworkStatus.loading,
    isLoadingMore: networkStatus === NetworkStatus.fetchMore,
    loadMore,
  };
};
