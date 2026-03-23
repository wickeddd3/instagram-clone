import { Link } from "react-router-dom";
import type { Profile } from "@/entities/profile";
import { useMemo } from "react";

export const SuggestionProfileLink = ({
  profile,
  optionSlot,
}: {
  profile: Profile;
  optionSlot?: React.ReactNode;
}) => {
  const suggestionLabel = useMemo(() => {
    if (profile.mutualFriend) {
      return `Followed by ${profile.mutualFriend}`;
    }
    if (profile.followersCount > 100) {
      return "Popular";
    }
    return "Suggested for you";
  }, [profile.mutualFriend, profile.followersCount]);

  return (
    <div className="flex items-center justify-between">
      <Link to={`/${profile.username}`} className="flex items-center gap-3">
        <img
          src={profile.avatarUrl || "/ig-default.jpg"}
          alt="Suggestion Profile Avatar"
          loading="lazy"
          decoding="async"
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-bold text-white">
            {profile.username}
          </span>
          <span className="text-[12px] text-gray-500">{suggestionLabel}</span>
        </div>
      </Link>
      {optionSlot}
    </div>
  );
};
