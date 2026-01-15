import { useQuery } from "@apollo/client/react";
import { GET_SUGGESTED_PROFILES } from "../../graphql/queries/profile";
import { Link } from "react-router-dom";
import type { SuggestedProfilesData } from "../../types/profile";
import { SuggestionItem } from "./SuggestionItem";

export const SuggestionsSidebar = () => {
  const { data, loading } = useQuery<SuggestedProfilesData>(
    GET_SUGGESTED_PROFILES,
    {
      variables: { limit: 5 },
    }
  );

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
        {data?.getSuggestedProfiles.map((user) => (
          <SuggestionItem user={user} />
        ))}
      </div>
    </div>
  );
};
