import { z } from "zod";

export const LoginFormSchema = z
  .object({
    email: z.string().min(1, "Email Required"),
    password: z.string().min(1, "Password Required"),
  })
  .required();

export type LoginFormType = z.infer<typeof LoginFormSchema>;

export const SignUpFormSchema = z
  .object({
    email: z.email(),
    password: z.string().min(1, "Password Required"),
    username: z.string().min(1, "Username Required"),
    displayName: z.string().min(1, "Full Name Required"),
  })
  .required();

export type SignUpFormType = z.infer<typeof SignUpFormSchema>;
