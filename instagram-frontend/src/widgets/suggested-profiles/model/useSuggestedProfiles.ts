import { useQuery } from "@apollo/client/react";
import { GET_SUGGESTED_PROFILES } from "../api/query";
import type { SuggestedProfiles } from "../model/types";

export const useSuggestedProfiles = ({ limit = 5 }: { limit?: number }) => {
  const { data, loading } = useQuery<SuggestedProfiles>(
    GET_SUGGESTED_PROFILES,
    {
      variables: { limit },
    },
  );

  return { suggestedProfiles: data?.getSuggestedProfiles || [], loading };
};
