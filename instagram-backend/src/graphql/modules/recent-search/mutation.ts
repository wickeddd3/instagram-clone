export const RecentSearchMutation = {
  addRecentSearch: async (
    _parent: any,
    { targetId }: { targetId: string },
    { userId, services }: any,
  ) => {
    if (!userId) return null;

    return services.recentSearch.addRecentSearch(userId, targetId);
  },

  removeRecentSearch: async (
    _parent: any,
    { targetId }: { targetId: string },
    { userId, services }: any,
  ) => {
    if (!userId) throw new Error("Unauthorized");

    return services.recentSearch.removeRecentSearch(userId, targetId);
  },

  clearRecentSearches: async (
    _parent: any,
    _args: any,
    { userId, services }: any,
  ) => {
    if (!userId) throw new Error("Unauthorized");

    return services.recentSearch.clearAll(userId);
  },
};
