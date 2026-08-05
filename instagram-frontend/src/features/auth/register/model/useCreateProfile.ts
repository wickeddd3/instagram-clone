import { useMutation } from "@apollo/client/react";
import { CREATE_PROFILE_MUTATION } from "../api/mutation";

export const useCreateProfile = () => {
  const [createProfile] = useMutation(CREATE_PROFILE_MUTATION);

  return { createProfile };
};
