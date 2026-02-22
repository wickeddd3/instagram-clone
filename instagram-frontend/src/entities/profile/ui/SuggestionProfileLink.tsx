import { Link } from "react-router-dom";
import type { Profile } from "@/entities/profile";

export const SuggestionProfileLink = ({
  profile,
  optionSlot,
}: {
  profile: Profile;
  optionSlot?: React.ReactNode;
}) => {
  return (
    <div className="flex items-center justify-between">
      <Link to={`/${profile.username}`} className="flex items-center gap-3">
        <img
          src={profile.avatarUrl || "/ig-default.jpg"}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-bold text-white">
            {profile.username}
          </span>
          <span className="text-[12px] text-gray-500">
            {profile.followersCount > 0
              ? `Followed by ${profile.mutualFriend}`
              : "New to Instagram"}
          </span>
        </div>
      </Link>
      {optionSlot}
    </div>
  );
};
