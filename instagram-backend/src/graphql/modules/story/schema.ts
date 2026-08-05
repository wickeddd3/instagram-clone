import { z } from "zod";
import { MEDIA_TYPES } from "@/graphql/modules/post/schema";

export const createStorySchema = z.object({
  mediaUrl: z.url("A story needs a valid media URL"),
  mediaType: z.enum(MEDIA_TYPES),
});

export type CreateStoryInput = z.infer<typeof createStorySchema>;
