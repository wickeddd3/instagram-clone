import { z } from "zod";

// Mirrors the backend signup schema so most invalid input is caught inline
// before the request, and the two never drift. Each field reports a "Required"
// message when empty and a specific format/length message once it has input.
export const SignUpFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email Required")
    .pipe(z.email("Enter a valid email address")),
  password: z
    .string()
    .min(1, "Password Required")
    .min(6, "Password must be at least 6 characters"),
  username: z
    .string()
    .min(1, "Username Required")
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
