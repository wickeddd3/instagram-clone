import { prisma } from "../../../lib/prisma";

export const RecentSearchMutation = {
  addRecentSearch: async (
    _parent: any,
    { targetId }: { targetId: string },
    context: any,
  ) => {
    if (!context.userId) return false;

    // Upsert: If it exists, update the timestamp to bring it to the top
    await prisma.recentSearch.upsert({
      where: { userId_targetId: { userId: context.userId, targetId } },
      update: { createdAt: new Date() },
      create: { userId: context.userId, targetId },
    });
    return true;
  },
  removeRecentSearch: async (
    _parent: any,
    { targetId }: { targetId: string },
    context: any,
  ) => {
    await prisma.recentSearch.delete({
      where: { userId_targetId: { userId: context.userId, targetId } },
    });
    return true;
  },
  clearRecentSearches: async (_parent: any, _args: any, context: any) => {
    if (!context.userId) return false;

    await prisma.recentSearch.deleteMany({
      where: { userId: context.userId },
    });

    return true;
  },
};
