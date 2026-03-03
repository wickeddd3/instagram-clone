import { PrismaClient } from "@prisma/client/extension";

export class RecentSearchService {
  constructor(private prisma: PrismaClient) {}

  async getRecentSearches(userId: string) {
    const records = await this.prisma.recentSearch.findMany({
      where: { userId },
      include: { target: true },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    // Return the Profile objects directly
    return records.map((r: any) => r.target);
  }

  async addRecentSearch(userId: string, targetId: string) {
    // We use upsert so that searching for someone again
    // simply moves them to the top of the list.
    await this.prisma.recentSearch.upsert({
      where: {
        userId_targetId: { userId, targetId },
      },
      update: { createdAt: new Date() },
      create: { userId, targetId },
    });

    return targetId;
  }

  async removeRecentSearch(userId: string, targetId: string) {
    await this.prisma.recentSearch.delete({
      where: {
        userId_targetId: { userId, targetId },
      },
    });

    return targetId;
  }

  async clearAll(userId: string) {
    await this.prisma.recentSearch.deleteMany({
      where: { userId },
    });

    return true;
  }
}
