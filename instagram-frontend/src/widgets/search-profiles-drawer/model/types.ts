import type { Profile } from "@/entities/profile";

export interface RecentSearches {
  getRecentSearches: Profile[];
}

export interface SearchResults {
  searchProfiles: Profile[];
}
