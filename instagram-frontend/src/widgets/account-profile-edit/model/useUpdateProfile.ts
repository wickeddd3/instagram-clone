import { useMutation } from "@apollo/client/react";
import { UPDATE_PROFILE } from "../api/mutation";

export const useUpdateProfile = ({
  onCompleted,
}: {
  onCompleted?: () => void;
}) => {
  const [updateProfile, { loading: isProfileUpdating }] = useMutation(
    UPDATE_PROFILE,
    {
      onCompleted: () => {
        onCompleted?.();
      },
    },
  );

  return {
    updateProfile,
    isProfileUpdating,
  };
};
