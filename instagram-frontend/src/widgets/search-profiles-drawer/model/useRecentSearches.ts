import { useMutation, useQuery } from "@apollo/client/react";
import { GET_RECENT_SEARCHES } from "../api/query";
import {
  ADD_RECENT_SEARCH,
  CLEAR_RECENT_SEARCHES,
  REMOVE_RECENT_SEARCH,
} from "../api/mutation";
import type { RecentSearches } from "./types";

export const useRecentSearches = () => {
  const {
    data,
    loading,
    refetch: refetchHistory,
  } = useQuery<RecentSearches>(GET_RECENT_SEARCHES);

  const [addRecentSearch] = useMutation(ADD_RECENT_SEARCH);

  const [removeRecentSearch] = useMutation(REMOVE_RECENT_SEARCH, {
    optimisticResponse: (vars) => ({
      removeRecentSearch: vars.targetId, // Matches GraphQL schema return type
      __typename: "RemoveRecentSearchResponse", // Optional but can help with cache consistency
    }),
    update(cache, { data: { removeRecentSearch: targetId } }: any) {
      if (!targetId) return;

      cache.modify({
        fields: {
          getRecentSearches(existingRefs = [], { readField }) {
            const filtered = existingRefs.filter(
              (ref: any) => readField("id", ref) !== targetId,
            );
            return filtered;
          },
        },
      });
    },
  });

  const [clearRecentSearches] = useMutation(CLEAR_RECENT_SEARCHES, {
    update(cache) {
      cache.modify({
        fields: {
          getRecentSearches() {
            return [];
          },
        },
      });
    },
  });

  return {
    recentSearches: data?.getRecentSearches || [],
    loading,
    refetchHistory,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
  };
};
