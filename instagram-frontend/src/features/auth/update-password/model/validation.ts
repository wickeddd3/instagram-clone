import { z } from "zod";

export const UpdatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password Required"),
    newPassword: z
      .string()
      .min(1, "New password Required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "New password must be different from your current password",
    path: ["newPassword"],
  });

export type UpdatePasswordType = z.infer<typeof UpdatePasswordSchema>;
