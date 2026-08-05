import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormSchema, type SignUpFormType } from "./validation";
import { apiPost, ApiError } from "@/shared/lib";

export const useRegister = ({
  onError,
  onSuccess,
}: {
  onError?: (value: string) => void;
  onSuccess?: (email: string) => void;
}) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormType>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      displayName: "",
    },
  });

  const registerUser = handleSubmit(async (data: SignUpFormType) => {
    setLoading(true);
    onError?.("");
    try {
      // The backend owns signup: it creates the auth user (unconfirmed) and the
      // profile, then Supabase emails a verification link. No session is returned.
      await apiPost("/auth/signup", data);
      onSuccess?.(data.email);
    } catch (error) {
      onError?.(
        error instanceof ApiError
          ? error.message
          : "An error occurred during signup.",
      );
    } finally {
      setLoading(false);
    }
  });

  return {
    registerField: register,
    registerUser,
    loading,
    errors,
  };
};
