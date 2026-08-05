import { Loader } from "lucide-react";
import { FormField, SubmitButton } from "@/shared/ui";
import { useAuth } from "@/entities/profile";
import { useUpdatePassword } from "../model/useUpdatePassword";

export const UpdatePasswordForm = () => {
  const { authUser } = useAuth();

  const { registerField, submit, loading, errors } = useUpdatePassword({
    email: authUser?.email,
  });

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <FormField
        label="Current password"
        type="password"
        autoComplete="current-password"
        {...registerField("currentPassword")}
        error={errors.currentPassword?.message}
      />
      <FormField
        label="New password"
        type="password"
        autoComplete="new-password"
        {...registerField("newPassword")}
        error={errors.newPassword?.message}
      />
      <FormField
        label="Confirm new password"
        type="password"
        autoComplete="new-password"
        {...registerField("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      <SubmitButton disabled={loading} className="max-w-52 self-end">
        {loading ? (
          <Loader className="animate-spin" size={18} aria-label="Saving" />
        ) : (
          "Update password"
        )}
      </SubmitButton>
    </form>
  );
};
