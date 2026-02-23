import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProfile } from "./useCreateProfile";
import { SignUpFormSchema, type SignUpFormType } from "./validation";
import { signUp } from "@/shared/lib/supabase-auth";

export const useRegister = ({
  onError,
  onSuccess,
}: {
  onError?: (value: string) => void;
  onSuccess?: () => void;
}) => {
  const { createProfile } = useCreateProfile();
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
    try {
      const { data: response, error } = await signUp(data.email, data.password);

      if (error) {
        onError?.(
          "Sorry, we were unable to register you with the provided credentials. Please double-check your information and try again.",
        );
        return;
      }

      if (response.user) {
        await createProfile({
          variables: {
            id: response.user.id,
            email: response.user.email,
            username: data.username,
            displayName: data.displayName,
          },
        });
      }
      setLoading(false);
      onSuccess?.();
    } catch (error) {
      console.error(error);
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
