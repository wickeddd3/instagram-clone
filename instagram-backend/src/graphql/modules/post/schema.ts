import { z } from "zod";

export const MEDIA_TYPES = ["IMAGE", "VIDEO"] as const;

export const createPostSchema = z.object({
  media: z
    .array(
      z.object({
        url: z.url("Each media item needs a valid URL"),
        type: z.enum(MEDIA_TYPES),
      }),
    )
    .min(1, "A post needs at least one media item")
    .max(10, "A post can have at most 10 media items"),
  caption: z.string().max(2200, "Caption must be 2200 characters or fewer").optional().default(""),
  location: z.string().max(100, "Location must be 100 characters or fewer").optional().default(""),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
