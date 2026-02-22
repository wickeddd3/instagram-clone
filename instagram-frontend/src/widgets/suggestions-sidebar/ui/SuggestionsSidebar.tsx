import { Link } from "react-router-dom";
import { SuggestionItem } from "./SuggestionItem";
import { useSuggestedProfiles } from "../model/useSuggestedProfiles";

export const SuggestionsSidebar = () => {
  const { suggestedProfiles, loading } = useSuggestedProfiles();

  if (loading)
    return <div className="animate-pulse w-full h-40 bg-gray-900 rounded-lg" />;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-bold text-gray-100">
          Suggested for you
        </span>
        <Link
          to="/explore/people"
          className="text-xs font-bold text-gray-100 hover:text-gray-400"
        >
          See All
        </Link>
      </div>

      {/* Suggested Users List */}
      <div className="flex flex-col gap-3">
        {suggestedProfiles.map((profile) => (
          <SuggestionItem key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  );
};
