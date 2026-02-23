import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema, type LoginFormType } from "./validation";
import { signIn } from "@/shared/lib/supabase-auth";

export const useLogin = ({
  onError,
  onSuccess,
}: {
  onError?: (value: string) => void;
  onSuccess?: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginUser = handleSubmit(async (data: LoginFormType) => {
    setLoading(true);
    try {
      const { error } = await signIn(data.email, data.password);
      setLoading(false);
      onError?.("");
      if (error) {
        onError?.(
          "Sorry, your password was incorrect. Please double-check your password.",
        );
        return;
      }
      onSuccess?.();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  });

  return {
    registerField: register,
    loginUser,
    loading,
  };
};
