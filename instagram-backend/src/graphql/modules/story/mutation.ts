import type { GraphQLContext } from "@/graphql/context";
import { unauthenticatedError } from "@/graphql/errors";
import { validateInput } from "@/graphql/validation";
import { createStorySchema } from "./schema";

export const StoryMutation = {
  createStory: (
    _parent: unknown,
    args: { mediaUrl: string; mediaType: string },
    { userId, services }: GraphQLContext,
  ) => {
    if (!userId) throw unauthenticatedError();

    const { mediaUrl, mediaType } = validateInput(createStorySchema, args);

    return services.story.createStory(userId, { mediaUrl, mediaType });
  },

  viewStory: (_parent: unknown, { storyId }: { storyId: string }, { userId, services }: GraphQLContext) => {
    if (!userId) return null;
    return services.story.viewStory(storyId, userId);
  },
};
