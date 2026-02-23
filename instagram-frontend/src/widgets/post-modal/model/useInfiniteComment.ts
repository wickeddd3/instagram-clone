import { useQuery } from "@apollo/client/react";
import { GET_COMMENTS } from "../api/query";
import type { Comments } from "./types";
import { NetworkStatus } from "@apollo/client";

export const useInfiniteComment = ({ postId }: { postId: string }) => {
  const { data, loading, error, fetchMore, networkStatus } = useQuery<Comments>(
    GET_COMMENTS,
    {
      variables: { postId },
      skip: !postId,
      notifyOnNetworkStatusChange: true,
    },
  );

  const {
    comments = [],
    hasMore = false,
    nextCursor = null,
  } = data?.getComments || {};

  const loadMore = () => {
    if (!hasMore || loading) return;
    fetchMore({
      variables: { cursor: nextCursor },
    });
  };

  return {
    comments,
    hasMore,
    nextCursor,
    loading,
    error,
    isLoadingMore: networkStatus === NetworkStatus.refetch,
    loadMore,
  };
};
