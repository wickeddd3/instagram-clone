import { SuggestedProfiles } from "@/widgets/suggested-profiles";
import { Link } from "react-router-dom";

export const SuggestionsSidebar = () => {
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
      <SuggestedProfiles limit={5} />
    </div>
  );
};
