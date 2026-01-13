import { z } from "zod";

export const LoginFormSchema = z
  .object({
    email: z.string().min(1, "Email Required"),
    password: z.string().min(1, "Password Required"),
  })
  .required();

export type LoginFormType = z.infer<typeof LoginFormSchema>;
