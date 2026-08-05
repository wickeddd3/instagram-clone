import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { reauthenticate, updatePassword } from "@/shared/lib";
import { UpdatePasswordSchema, type UpdatePasswordType } from "./validation";

export const useUpdatePassword = ({ email }: { email?: string }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<UpdatePasswordType>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const submit = handleSubmit(async ({ currentPassword, newPassword }) => {
    if (!email) return;

    setLoading(true);

    // Re-verify the current password before changing it. Supabase would let us
    // update the password from the active session alone, so this guards against
    // someone changing it on an unattended, already-signed-in device.
    const { error: authError } = await reauthenticate(email, currentPassword);
    if (authError) {
      setLoading(false);
      setError("currentPassword", { message: "Current password is incorrect" });
      return;
    }

    const { error } = await updatePassword(newPassword);
    setLoading(false);

    if (error) {
      setError("newPassword", { message: error.message });
      return;
    }

    reset();
    toast.success("Password updated");
  });

  return {
    registerField: register,
    submit,
    loading,
    errors,
  };
};
