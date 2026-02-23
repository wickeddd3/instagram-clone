import { z } from "zod";

export const ProfileFormSchema = z
  .object({
    displayName: z
      .string()
      .max(30, "Display name must be at most 30 characters")
      .nullable(),
    bio: z.string().max(150, "Bio must be at most 150 characters").nullable(),
    website: z.url("Website must be a valid URL").nullable(),
  })
  .partial();

export type ProfileFormType = z.infer<typeof ProfileFormSchema>;
