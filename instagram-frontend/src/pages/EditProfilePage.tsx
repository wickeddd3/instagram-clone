import { useAuth } from "../app/providers/AuthContext";
import { Loader2 } from "lucide-react";
import { useUploadAvatarModal } from "@/widgets/upload-avatar-modal";
import { ProfileAvatar, ProfileForm } from "@/widgets/account-profile-edit";

const EditProfilePage = () => {
  const { authProfile, authProfileLoading } = useAuth();
  const { openUploadAvatarModal } = useUploadAvatarModal();

  if (authProfileLoading) {
    return (
      <div className="flex justify-center pt-20">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-xl w-full mx-auto mt-8">
      <div className="flex flex-col gap-6 p-4">
        <h2 className="text-xl font-semibold mb-4">Edit profile</h2>
        {authProfile && (
          <ProfileAvatar
            profile={authProfile}
            optionSlot={
              <button
                type="button"
                className="bg-indigo-800 px-4 py-2 text-sm font-bold rounded-lg cursor-pointer hover:text-white"
                onClick={() =>
                  openUploadAvatarModal({
                    avatarUrl: authProfile?.avatarUrl,
                  })
                }
              >
                Change photo
              </button>
            }
          />
        )}
        {authProfile && <ProfileForm profile={authProfile} />}
      </div>
    </div>
  );
};

export default EditProfilePage;
