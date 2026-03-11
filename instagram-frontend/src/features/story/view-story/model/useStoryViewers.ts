import { useLazyQuery } from "@apollo/client/react";
import { GET_STORY_VIEWERS } from "../api/query";
import type { StoryViewers } from "./types";

export const useStoryViewers = () => {
  const [getStoryViewers, { data, loading }] =
    useLazyQuery<StoryViewers>(GET_STORY_VIEWERS);

  return {
    viewers: data?.getStoryViewers || [],
    loading,
    getStoryViewers,
  };
};
