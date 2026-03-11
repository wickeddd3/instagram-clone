import { useMutation } from "@apollo/client/react";
import type { CreatedStory } from "./types";
import { CREATE_STORY } from "../api/mutation";

export const useCreateStory = ({
  onCompleted,
}: {
  onCompleted?: () => void;
}) => {
  const [createStory] = useMutation<CreatedStory>(CREATE_STORY, {
    update(cache, { data }) {
      const newStory = data?.createStory;
      if (!newStory) return;

      const storyRef = cache.identify({
        __typename: "UserStory",
        id: newStory.id,
      });

      cache.modify({
        fields: {
          getStoriesFeed(existing = [], { readField }) {
            // Check if user already exists in the feed to avoid duplicates
            const exists = existing.some(
              (ref: any) => readField("id", ref) === newStory.id,
            );

            if (exists) {
              // Move the existing story to the front (auth user should be first)
              const filtered = existing.filter(
                (ref: any) => readField("id", ref) !== newStory.id,
              );
              return [{ __ref: storyRef }, ...filtered];
            }

            // Add as new to the front
            return [{ __ref: storyRef }, ...existing];
          },
        },
      });
    },
    onCompleted: () => {
      onCompleted?.();
    },
  });

  return { createStory };
};
