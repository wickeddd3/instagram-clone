import { Loader } from "lucide-react";
import { FormField, SubmitButton, Alert } from "@/shared/ui";
import { useAuth } from "@/entities/profile";
import { useUpdateEmail } from "../model/useUpdateEmail";

export const UpdateEmailForm = () => {
  const { authUser } = useAuth();
  const currentEmail = authUser?.email;

  const { registerField, submit, loading, errors, pendingEmail } =
    useUpdateEmail({ currentEmail });

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <FormField
        label="New email"
        type="text"
        autoComplete="email"
        {...registerField("email")}
        error={errors.email?.message}
        helper={
          currentEmail ? (
            <>
              Current: <span className="text-foreground">{currentEmail}</span>
            </>
          ) : undefined
        }
      />

      {pendingEmail && (
        <Alert variant="info" title="Confirm your new email">
          We sent a confirmation link to {pendingEmail}. Your email changes once
          you open it.
        </Alert>
      )}

      <SubmitButton disabled={loading} className="max-w-44 self-end">
        {loading ? (
          <Loader className="animate-spin" size={18} aria-label="Saving" />
        ) : (
          "Update email"
        )}
      </SubmitButton>
    </form>
  );
};
