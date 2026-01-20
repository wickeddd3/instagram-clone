import { prisma } from "../../../lib/prisma";

export const RecentSearchQuery = {
  getRecentSearches: async (_parent: any, _args: any, context: any) => {
    if (!context.userId) return [];

    const records = await prisma.recentSearch.findMany({
      where: { userId: context.userId },
      include: { target: true },
      orderBy: { createdAt: "desc" },
      take: 10,
    });
    return records.map((r) => r.target);
  },
};
