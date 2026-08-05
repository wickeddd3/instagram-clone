import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { updateEmail } from "@/shared/lib";
import { UpdateEmailSchema, type UpdateEmailType } from "./validation";

export const useUpdateEmail = ({ currentEmail }: { currentEmail?: string }) => {
  const [loading, setLoading] = useState(false);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UpdateEmailType>({
    resolver: zodResolver(UpdateEmailSchema),
    defaultValues: { email: "" },
  });

  const submit = handleSubmit(async ({ email }) => {
    if (email === currentEmail) {
      setError("email", { message: "This is already your email address" });
      return;
    }

    setLoading(true);
    const { error } = await updateEmail(email);
    setLoading(false);

    if (error) {
      setError("email", { message: error.message });
      return;
    }

    setPendingEmail(email);
    toast.success("Confirmation email sent");
  });

  return {
    registerField: register,
    submit,
    loading,
    errors,
    pendingEmail,
  };
};
