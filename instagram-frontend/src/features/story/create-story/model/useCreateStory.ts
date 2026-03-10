import { useMutation } from "@apollo/client/react";
import type { CreatedStory } from "./types";
import { CREATE_STORY } from "../api/mutation";

export const useCreateStory = ({
  onCompleted,
}: {
  onCompleted?: () => void;
}) => {
  const [createStory] = useMutation<CreatedStory>(CREATE_STORY, {
    onCompleted: () => {
      onCompleted?.();
    },
  });

  return { createStory };
};
