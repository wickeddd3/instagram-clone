import type { GraphQLContext } from "@/graphql/context";
import { unauthenticatedError } from "@/graphql/errors";

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
    if (!userId) throw unauthenticatedError();

    return services.recentSearch.removeRecentSearch(userId, targetId);
  },

  clearRecentSearches: async (_parent: unknown, _args: unknown, { userId, services }: GraphQLContext) => {
    if (!userId) throw unauthenticatedError();

    return services.recentSearch.clearAll(userId);
  },
};
