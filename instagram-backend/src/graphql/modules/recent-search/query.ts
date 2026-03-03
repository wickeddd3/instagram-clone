export const RecentSearchQuery = {
  getRecentSearches: async (
    _parent: any,
    _args: any,
    { userId, services }: any,
  ) => {
    if (!userId) return [];

    return services.recentSearch.getRecentSearches(userId);
  },
};
