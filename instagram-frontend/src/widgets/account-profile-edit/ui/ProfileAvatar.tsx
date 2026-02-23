import type { Profile } from "@/entities/profile";
import type { ReactNode } from "react";

export const ProfileAvatar = ({
  profile,
  optionSlot,
}: {
  profile: Profile;
  optionSlot?: ReactNode;
}) => {
  return (
    <div className="flex items-center justify-between gap-8 bg-[#262626] rounded-lg p-4">
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 md:w-15 md:h-15 shrink-0">
          <img
            src={profile?.avatarUrl || "/ig-default.jpg"}
            className="rounded-full w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-md">{profile?.username}</span>
          <span className="font-normal text-sm text-gray-400">
            {profile?.displayName}
          </span>
        </div>
      </div>
      {optionSlot}
    </div>
  );
};
