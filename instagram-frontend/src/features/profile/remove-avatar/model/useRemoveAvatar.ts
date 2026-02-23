import { useMutation } from "@apollo/client/react";
import { REMOVE_PROFILE_AVATAR } from "../api/mutation";
import { removeImage } from "@/shared/lib/supabase-upload";

export const useRemoveAvatar = ({
  onCompleted = () => {},
}: {
  onCompleted?: () => void;
}) => {
  const [removeAvatar] = useMutation(REMOVE_PROFILE_AVATAR, {
    onCompleted: () => {
      onCompleted?.();
    },
  });

  const handleRemoveAvatar = async (url?: string) => {
    if (!url) return;
    const profileAvatarPath = url?.split("avatars/")[1];
    await removeImage(profileAvatarPath, "avatars");
    await removeAvatar();
  };

  return { removeAvatar, handleRemoveAvatar };
};
