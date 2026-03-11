import { useMutation } from "@apollo/client/react";
import { VIEW_STORY } from "../api/mutation";
import type { ViewStoryData, ViewStoryVars } from "./types";

export const useViewStory = (userStoryId: string) => {
  const [viewStory] = useMutation<ViewStoryData, ViewStoryVars>(VIEW_STORY, {
    update(cache, { data }: any) {
      const hasUnseen = data?.viewStory;
      if (hasUnseen === false) {
        cache.modify({
          id: cache.identify({ __typename: "UserStory", id: userStoryId }),
          fields: {
            hasUnseenStories() {
              return false;
            },
          },
        });
      }
    },
  });

  return { viewStory };
};
