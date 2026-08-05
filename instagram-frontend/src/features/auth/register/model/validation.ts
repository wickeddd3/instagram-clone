import { z } from "zod";

export const SignUpFormSchema = z
  .object({
    email: z.string().min(1, "Email Required"),
    password: z.string().min(1, "Password Required"),
    username: z.string().min(1, "Username Required"),
    displayName: z.string().min(1, "Full Name Required"),
  })
  .required();

export type SignUpFormType = z.infer<typeof SignUpFormSchema>;
