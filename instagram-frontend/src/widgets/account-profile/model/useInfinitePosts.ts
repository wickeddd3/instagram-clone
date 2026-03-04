import { useQuery } from "@apollo/client/react";
import { GET_PROFILE_POSTS } from "../api/query";
import type { ProfilePosts } from "./types";
import { NetworkStatus } from "@apollo/client";
import { useCallback } from "react";

export const useInfinitePosts = ({ profileId }: { profileId: string }) => {
  const { data, error, fetchMore, networkStatus } = useQuery<ProfilePosts>(
    GET_PROFILE_POSTS,
    {
      variables: { profileId, cursor: null, limit: 5 },
      skip: !profileId,
      notifyOnNetworkStatusChange: true,
    },
  );

  const {
    posts = [],
    hasMore = false,
    nextCursor = null,
  } = data?.getProfilePosts || {};

  const loadMore = useCallback(() => {
    if (!hasMore || networkStatus === NetworkStatus.fetchMore) return;

    fetchMore({
      variables: { cursor: nextCursor },
    });
  }, [hasMore, nextCursor, fetchMore, networkStatus]);

  return {
    posts,
    hasMore,
    loading: networkStatus === NetworkStatus.loading,
    isLoadingMore: networkStatus === NetworkStatus.fetchMore,
    loadMore,
    error,
  };
};
