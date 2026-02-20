import { useQuery } from "@apollo/client/react";
import { GET_SUGGESTED_PROFILES } from "../api/query";
import type { SuggestedProfiles } from "./types";

export const useSuggestedProfiles = () => {
  const { data, loading } = useQuery<SuggestedProfiles>(
    GET_SUGGESTED_PROFILES,
    {
      variables: { limit: 5 },
    },
  );

  return { suggestedProfiles: data?.getSuggestedProfiles || [], loading };
};
