import { Loader2 } from "lucide-react";
import { useAuth } from "@/entities/profile";
import { useUploadAvatarModal } from "@/widgets/upload-avatar-modal";
import { ProfileAvatar, ProfileForm } from "@/widgets/account-profile-edit";
import { UpdateEmailForm } from "@/features/auth/update-email";
import { UpdatePasswordForm } from "@/features/auth/update-password";
import { SettingsSection } from "./SettingsSection";

const EditProfilePage = () => {
  const { authProfile, authProfileLoading } = useAuth();
  const { openUploadAvatarModal } = useUploadAvatarModal();

  if (authProfileLoading) {
    return (
      <div
        className="flex justify-center pt-20"
        role="status"
        aria-label="Loading"
      >
        <Loader2 className="animate-spin" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl w-full mx-auto px-4 py-8">
      <header className="mb-8">
        <h2 className="text-2xl font-semibold">Edit profile</h2>
        <p className="text-sm text-gray-400 mt-1">
          Manage your photo, profile information, and account security.
        </p>
      </header>

      <div className="flex flex-col gap-6">
        <SettingsSection
          title="Profile photo"
          description="This appears next to your name across Instagram."
        >
          {authProfile && (
            <ProfileAvatar
              profile={authProfile}
              optionSlot={
                <button
                  type="button"
                  className="bg-indigo-800 px-4 py-2 text-sm font-bold rounded-lg cursor-pointer hover:bg-indigo-700 hover:text-white transition"
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
        </SettingsSection>

        <SettingsSection
          title="Profile information"
          description="Your name, website, and bio are visible on your public profile."
        >
          {authProfile && <ProfileForm profile={authProfile} />}
        </SettingsSection>

        <SettingsSection
          title="Email address"
          description="Used to sign in and receive account notifications."
        >
          <UpdateEmailForm />
        </SettingsSection>

        <SettingsSection
          title="Password"
          description="Choose a strong password you don't reuse elsewhere."
        >
          <UpdatePasswordForm />
        </SettingsSection>
      </div>
    </div>
  );
};

export default EditProfilePage;
