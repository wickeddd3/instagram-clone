import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useMutation, useQuery } from "@apollo/client/react";
import { UPDATE_PROFILE } from "../graphql/mutations/profile";
import { GET_PROFILE } from "../graphql/queries/profile";
import { Loader2, CheckCircle2 } from "lucide-react";
import { ProfileFormSchema, type ProfileFormType } from "../validation/profile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ProfileData } from "../types/profile";

const EditProfile = () => {
  const { user } = useAuth();

  // Setup Form
  const form = useForm<ProfileFormType>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      displayName: "",
      bio: "",
      website: "",
    },
  });

  const { register, reset, handleSubmit } = form;

  const [isSuccess, setIsSuccess] = useState(false);

  // Fetch current profile data
  const { data, loading: queryLoading } = useQuery<ProfileData>(GET_PROFILE, {
    variables: { id: user?.id },
  });

  // Setup Update Mutation
  const [updateProfile, { loading: mutationLoading }] = useMutation(
    UPDATE_PROFILE,
    {
      onCompleted: () => {
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
      },
    }
  );

  // Handle Form Submission
  const onSubmit = handleSubmit(async (data: ProfileFormType) => {
    await updateProfile({
      variables: {
        ...data,
      },
    });
  });

  // Populate form when data is fetched
  useEffect(() => {
    if (data?.getProfile) {
      const { displayName, bio, website } = data.getProfile;
      reset({
        displayName,
        bio,
        website,
      });
    }
  }, [data]);

  if (queryLoading)
    return (
      <div className="flex justify-center pt-20">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="max-w-xl w-full mx-auto mt-8">
      {/* Form Content */}
      <form onSubmit={onSubmit} className="flex flex-col gap-10 p-4">
        <h2 className="text-xl font-semibold mb-4">Edit profile</h2>

        {/* Avatar Preview Section */}
        <div className="flex items-center justify-between gap-8 bg-[#262626] rounded-lg p-4">
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 md:w-15 md:h-15 shrink-0">
              <img
                src={data?.getProfile.avatarUrl || "/ig-default.jpg"}
                className="rounded-full w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-md">
                {data?.getProfile.username}
              </span>
              <span className="font-normal text-sm text-gray-400">
                {data?.getProfile.displayName}
              </span>
            </div>
          </div>
          <button
            type="button"
            className="bg-indigo-800 px-4 py-2 text-sm font-bold rounded-lg cursor-pointer hover:text-white"
          >
            Change photo
          </button>
        </div>

        {/* Display Name Input */}
        <div className="flex flex-col gap-2 md:gap-6">
          <label className="font-semibold text-md">Display Name</label>
          <div className="flex-1">
            <input
              {...register("displayName")}
              type="text"
              className="w-full bg-[#0d1015] border border-gray-700 rounded-xl p-4 text-sm focus:border-white outline-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              In most cases, you'll be able to change your username back to{" "}
              {data?.getProfile.username} for another 14 days.
            </p>
          </div>
        </div>

        {/* Website Input */}
        <div className="flex flex-col gap-2 md:gap-4">
          <label className="font-bold text-md">Website</label>
          <div className="flex-1">
            <input
              {...register("website")}
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
              {...register("bio")}
              maxLength={150}
              className="w-full bg-[#0d1015] border border-gray-700 rounded-xl p-4 text-sm focus:border-white outline-none h-20 resize-none"
            />
            <div className="text-xs text-gray-500 text-right">
              {/* {bio.length} / 150 */}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-8 mt-4">
          <button
            type="submit"
            disabled={mutationLoading}
            className="bg-indigo-800 hover:bg-indigo-700 text-white px-22 py-3 rounded-lg font-bold cursor-pointer text-sm transition disabled:opacity-50"
          >
            {mutationLoading ? "Saving..." : "Submit"}
          </button>
          {isSuccess && (
            <span className="text-green-500 flex items-center gap-1 text-sm">
              <CheckCircle2 size={16} /> Profile saved.
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
