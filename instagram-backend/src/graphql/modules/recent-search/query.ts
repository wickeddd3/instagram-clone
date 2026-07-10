import type { GraphQLContext } from "@/graphql/context";

export const RecentSearchQuery = {
  getRecentSearches: async (_parent: unknown, _args: unknown, { userId, services }: GraphQLContext) => {
    if (!userId) return [];

    return services.recentSearch.getRecentSearches(userId);
  },
};
