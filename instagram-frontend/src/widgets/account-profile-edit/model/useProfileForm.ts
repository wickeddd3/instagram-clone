import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProfileFormSchema, type ProfileFormType } from "./validation";

export const useProfileForm = () => {
  const { register, reset, handleSubmit } = useForm<ProfileFormType>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      displayName: "",
      bio: "",
      website: "",
    },
  });

  return {
    registerField: register,
    resetForm: reset,
    handleSubmit,
  };
};
