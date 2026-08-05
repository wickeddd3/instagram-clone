import { z } from "zod";

export const addCommentSchema = z.object({
  postId: z.string().min(1),
  text: z.string().trim().min(1, "Comment cannot be empty").max(2200, "Comment must be 2200 characters or fewer"),
  parentId: z.string().min(1).nullish(),
});

export type AddCommentInput = z.infer<typeof addCommentSchema>;
