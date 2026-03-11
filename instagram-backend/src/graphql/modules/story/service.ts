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

  async viewStory(storyId: string, viewerId: string): Promise<boolean | null> {
    const story = await this.prisma.story.findUnique({
      where: { id: storyId },
      select: { authorId: true },
    });

    // Return null if story not exist
    if (!story) return null;

    // 1. Upsert the view record (prevents duplicates)
    await this.prisma.storyView.upsert({
      where: {
        storyId_viewerId: { storyId, viewerId },
      },
      update: {}, // Do nothing if already exists
      create: { storyId, viewerId },
    });

    // 2. Check: Does this author have ANY other active stories
    // that this viewer has NOT seen yet?
    const unseenStoriesCount = await this.prisma.story.count({
      where: {
        authorId: story.authorId,
        expiresAt: { gt: new Date() },
        views: {
          none: { viewerId: viewerId },
        },
      },
    });

    // 3. If count is > 0, they still have unseen stories (True).
    // If count is 0, all stories are seen (False).
    return unseenStoriesCount > 0;
  }
}
