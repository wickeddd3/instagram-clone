import type { GraphQLContext } from "../../context";

export const RecentSearchMutation = {
  addRecentSearch: async (
    _parent: unknown,
    { targetId }: { targetId: string },
    { userId, services }: GraphQLContext,
  ) => {
    if (!userId) return null;

    return services.recentSearch.addRecentSearch(userId, targetId);
  },

  removeRecentSearch: async (
    _parent: unknown,
    { targetId }: { targetId: string },
    { userId, services }: GraphQLContext,
  ) => {
    if (!userId) throw new Error("Unauthorized");

    return services.recentSearch.removeRecentSearch(userId, targetId);
  },

  clearRecentSearches: async (_parent: unknown, _args: unknown, { userId, services }: GraphQLContext) => {
    if (!userId) throw new Error("Unauthorized");

    return services.recentSearch.clearAll(userId);
  },
};
