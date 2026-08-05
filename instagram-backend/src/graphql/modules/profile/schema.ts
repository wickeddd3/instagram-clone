import { z } from "zod";

const username = z
  .string()
  .min(3)
  .max(30)
  .regex(/^[a-zA-Z0-9._]+$/, "Username may only contain letters, numbers, dots, and underscores");

export const createProfileSchema = z.object({
  id: z.uuid(),
  username,
  email: z.email(),
  displayName: z.string().trim().min(1).max(60),
});

export const updateProfileSchema = z.object({
  displayName: z.string().trim().max(60, "Name must be 60 characters or fewer").optional(),
  bio: z.string().max(150, "Bio must be 150 characters or fewer").optional(),
  website: z.string().trim().max(200, "Website must be 200 characters or fewer").optional(),
});

export const avatarSchema = z.object({
  avatarUrl: z.url("Avatar must be a valid URL"),
});

export type CreateProfileInput = z.infer<typeof createProfileSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
