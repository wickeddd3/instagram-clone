import { useQuery } from "@apollo/client/react";
import { GET_SUGGESTED_PROFILES } from "../graphql/queries/profile";
import type { SuggestedProfilesData } from "../types/profile";
import { SuggestionItem } from "../components/layouts/SuggestionItem";

const ExplorePeoplePage = () => {
  const { data, loading } = useQuery<SuggestedProfilesData>(
    GET_SUGGESTED_PROFILES,
    {
      variables: { limit: 15 },
    }
  );

  if (loading) {
    return (
      <div className="flex w-full justify-center pt-20 text-white">
        Loading suggestions...
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-xl">
      <div className="flex-1 flex flex-col gap-6 mt-6 md:mt-18 p-4">
        <h1 className="text-md font-bold text-gray-100">Suggested</h1>
        <div className="flex flex-col gap-3">
          {data?.getSuggestedProfiles.map((user) => (
            <SuggestionItem user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePeoplePage;
