import { useEffect } from "react";
import { useViewStory } from "./useViewStory";

export const useTriggerViewStory = (
  hasUnseenStories: boolean,
  activeStoryId: string,
) => {
  const { viewStory } = useViewStory();

  useEffect(() => {
    if (!hasUnseenStories) return;
    // Reset and start a fresh timer for the new story segment
    const timer = setTimeout(() => {
      viewStory({
        variables: {
          storyId: activeStoryId,
        },
      }).catch((err) => console.error("View tracking failed", err));
    }, 1000); // 1-second threshold

    return () => clearTimeout(timer);
  }, [hasUnseenStories, activeStoryId, viewStory]);
};
