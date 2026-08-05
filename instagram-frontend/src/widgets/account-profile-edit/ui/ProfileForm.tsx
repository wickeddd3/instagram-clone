import { useEffect } from "react";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { FormField, FormTextArea, SubmitButton } from "@/shared/ui";
import { useProfileForm } from "../model/useProfileForm";
import { useUpdateProfile } from "../model/useUpdateProfile";
import type { ProfileFormType } from "../model/validation";
import type { Profile } from "@/entities/profile";

export const ProfileForm = ({ profile }: { profile: Profile }) => {
  const { registerField, resetForm, handleSubmit, errors } = useProfileForm();

  const { updateProfile, isProfileUpdating } = useUpdateProfile({
    onCompleted: () => {
      toast.success("Profile updated");
    },
  });

  // Handle Form Submission
  const onSubmit = handleSubmit(async (data: ProfileFormType) => {
    await updateProfile({
      variables: {
        ...data,
      },
    });
  });

  // Populate form fields with current profile data when it loads
  useEffect(() => {
    if (profile) {
      const { displayName, bio, website } = profile;
      resetForm({
        displayName,
        bio,
        website,
      });
    }
  }, [profile, resetForm]);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <FormField
        label="Display name"
        {...registerField("displayName")}
        error={errors.displayName?.message}
        helper={`In most cases, you'll be able to change your name back to ${profile?.username} for another 14 days.`}
      />

      <FormField
        label="Website"
        autoComplete="url"
        {...registerField("website")}
        error={errors.website?.message}
      />

      <FormTextArea
        label="Bio"
        maxLength={150}
        {...registerField("bio")}
        error={errors.bio?.message}
      />

      <SubmitButton disabled={isProfileUpdating} className="max-w-40 self-end">
        {isProfileUpdating ? (
          <Loader className="animate-spin" size={18} aria-label="Saving" />
        ) : (
          "Save"
        )}
      </SubmitButton>
    </form>
  );
};
