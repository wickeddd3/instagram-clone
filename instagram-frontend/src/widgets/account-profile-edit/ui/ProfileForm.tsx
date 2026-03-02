import { useEffect } from "react";
import { useProfileForm } from "../model/useProfileForm";
import { useUpdateProfile } from "../model/useUpdateProfile";
import type { ProfileFormType } from "../model/validation";
import type { Profile } from "@/entities/profile";
import { toast } from "sonner";

export const ProfileForm = ({ profile }: { profile: Profile }) => {
  const { registerField, resetForm, handleSubmit } = useProfileForm();

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
  }, [profile]);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-10">
      {/* Display Name Input */}
      <div className="flex flex-col gap-2 md:gap-6">
        <label className="font-semibold text-md">Display Name</label>
        <div className="flex-1">
          <input
            {...registerField("displayName")}
            type="text"
            className="w-full bg-[#0d1015] border border-gray-700 rounded-xl p-4 text-sm focus:border-white outline-none"
          />
          <p className="text-xs text-gray-500 mt-2">
            In most cases, you'll be able to change your username back to{" "}
            {profile?.username} for another 14 days.
          </p>
        </div>
      </div>

      {/* Website Input */}
      <div className="flex flex-col gap-2 md:gap-4">
        <label className="font-bold text-md">Website</label>
        <div className="flex-1">
          <input
            {...registerField("website")}
            type="text"
            className="w-full bg-[#0d1015] border border-gray-700 rounded-xl p-4 text-sm focus:border-white outline-none"
          />
        </div>
      </div>

      {/* Bio Input */}
      <div className="flex flex-col gap-2 md:gap-4">
        <label className="font-bold text-md">Bio</label>
        <div className="flex-1">
          <textarea
            {...registerField("bio")}
            maxLength={150}
            className="w-full bg-[#0d1015] border border-gray-700 rounded-xl p-4 text-sm focus:border-white outline-none h-20 resize-none"
          />
          <div className="text-xs text-gray-500 text-right">
            {/* {bio.length} / 150 */}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex  justify-end gap-8 mt-4">
        <button
          type="submit"
          disabled={isProfileUpdating}
          className="bg-indigo-800 hover:bg-indigo-700 text-white px-22 py-3 rounded-lg font-bold cursor-pointer text-sm transition disabled:opacity-50"
        >
          {isProfileUpdating ? "Saving..." : "Submit"}
        </button>
      </div>
    </form>
  );
};
