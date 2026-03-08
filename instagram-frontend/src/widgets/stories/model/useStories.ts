import { useQuery } from "@apollo/client/react";
import { GET_STORIES_FEED } from "../api/query";
import type { StoriesFeed } from "./types";

export const useStories = ({ profileId }: { profileId: string }) => {
  const { data, loading } = useQuery<StoriesFeed>(GET_STORIES_FEED, {
    variables: { profileId },
  });

  return {
    stories: data?.getStoriesFeed || [],
    loading,
  };
};
