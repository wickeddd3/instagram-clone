import { PrismaClient } from "@prisma/client/extension";

export class StoryService {
  constructor(private prisma: PrismaClient) {}

  async getStoriesFeed(profileId: string) {
    const now = new Date();
    // Fetch users who have active stories
    const usersWithStories = await this.prisma.profile.findMany({
      where: {
        stories: {
          some: { expiresAt: { gt: now } },
        },
      },
      include: {
        stories: {
          where: { expiresAt: { gt: now } },
          orderBy: { createdAt: "asc" },
          include: {
            views: { where: { viewerId: profileId } },
            _count: { select: { views: true } },
          },
        },
      },
    });

    return usersWithStories.map((u: any) => ({
      ...u,
      hasUnseenStories: u.stories.some((s: any) => s.views.length === 0),
    }));
  }

  async getStoryViewers(storyId: string) {
    return await this.prisma.storyView.findMany({
      where: { storyId },
      include: {
        viewer: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: { viewedAt: "desc" },
    });
  }

  async createStory(
    userId: string,
    data: { mediaUrl: string; mediaType: "IMAGE" | "VIDEO" },
  ) {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // Set 24-hour lifespan

    return await this.prisma.story.create({
      data: { ...data, authorId: userId, expiresAt },
      include: { author: true },
    });
  }
}
