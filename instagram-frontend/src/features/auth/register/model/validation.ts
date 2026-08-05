import { z } from "zod";

// Mirrors the backend signup schema so most invalid input is caught inline
// before the request, and the two never drift.
export const SignUpFormSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(
      /^[a-zA-Z0-9._]+$/,
      "Username may only contain letters, numbers, dots, and underscores",
    ),
  displayName: z
    .string()
    .min(1, "Full Name Required")
    .max(60, "Full Name is too long"),
});

export type SignUpFormType = z.infer<typeof SignUpFormSchema>;
