import { Link } from "react-router-dom";
import type { Profile } from "../model/types";
import type { ReactNode } from "react";

export const ProfileLink = ({
  profile,
  optionSlot,
  onClick,
}: {
  profile: Profile;
  optionSlot?: ReactNode;
  onClick?: () => void;
}) => {
  return (
    <Link
      to={`/${profile.username}`}
      className="flex justify-between items-center"
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 rounded-full p-0.5">
          <div className="bg-[#0d1015] p-0.5 rounded-full w-full h-full">
            <img
              src={profile.avatarUrl || "/ig-default.jpg"}
              alt={`${profile.username}-avatar`}
              className="rounded-full w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm">{profile.username}</span>
          <h1 className="text-sm font-normal text-neutral-400">
            {profile.displayName}
          </h1>
        </div>
      </div>
      {optionSlot}
    </Link>
  );
};
