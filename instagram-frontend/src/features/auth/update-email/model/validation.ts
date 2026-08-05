import { z } from "zod";

export const UpdateEmailSchema = z.object({
  email: z
    .string()
    .min(1, "Email Required")
    .pipe(z.email("Enter a valid email address")),
});

export type UpdateEmailType = z.infer<typeof UpdateEmailSchema>;
