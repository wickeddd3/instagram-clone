import { useLazyQuery } from "@apollo/client/react";
import { SEARCH_PROFILES } from "../api/query";
import type { SearchResults } from "./types";

export const useSearchProfiles = () => {
  const [executeSearch, { data, loading }] =
    useLazyQuery<SearchResults>(SEARCH_PROFILES);

  return { executeSearch, results: data?.searchProfiles || [], loading };
};
