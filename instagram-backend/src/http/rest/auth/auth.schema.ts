import { z } from "zod";

// Request validation for the auth (signup) routes. Mirrors the frontend signup
// form fields; password length is enforced here since the backend now owns
// account creation.
export const signupBody = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9._]+$/, "Username may only contain letters, numbers, dots, and underscores"),
  displayName: z.string().min(1).max(60),
});

export type SignupBody = z.infer<typeof signupBody>;
