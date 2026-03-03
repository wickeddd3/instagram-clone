import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProfileAvailabilityCheck } from "./useProfileAvailabilityCheck";
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
  const { checkAvailability } = useProfileAvailabilityCheck();
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
      // 1. Check email and username availablity
      const { data: availabilityData } = await checkAvailability({
        variables: { email: data.email, username: data.username },
      });

      if (!availabilityData?.checkAvailability?.isEmailAvailable) {
        onError?.("Email is already registered.");
        setLoading(false);
        return;
      }

      if (!availabilityData?.checkAvailability?.isUsernameAvailable) {
        onError?.("Username is already taken.");
        setLoading(false);
        return;
      }

      // 2. Supabase signup if profile availability check passes
      const { data: response, error: authError } = await signUp(
        data.email,
        data.password,
      );

      if (authError) {
        onError?.(
          "Sorry, we were unable to register you with the provided credentials. Please double-check your information and try again.",
        );
        return;
      }

      // 3. Create profile
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
      onError?.("An error occurred during signup.");
      setLoading(false);
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
