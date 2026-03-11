import { useMutation } from "@apollo/client/react";
import { VIEW_STORY } from "../api/mutation";

export const useViewStory = () => {
  const [viewStory] = useMutation(VIEW_STORY);

  return { viewStory };
};
