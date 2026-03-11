import { PrismaClient } from "@prisma/client/extension";
import {
  MediaType,
  StoryView,
  StoryWithViews,
  UserStoryResponse,
} from "./service.types";

export class StoryService {
  constructor(private prisma: PrismaClient) {}

  private async getProfileWithStories(
    profileId: string,
    targetProfileId: string,
  ): Promise<UserStoryResponse | null> {
    const now = new Date();

    const profile = await this.prisma.profile.findUnique({
      where: { id: targetProfileId },
      select: {
        id: true,
        username: true,
        avatarUrl: true,
        stories: {
          where: { expiresAt: { gt: now } },
          orderBy: { createdAt: "asc" },
          include: {
            views: {
              where: { viewerId: profileId },
              select: { viewerId: true },
            },
            _count: { select: { views: true } },
          },
        },
      },
    });

    if (!profile || profile?.stories?.length === 0) return null;

    return {
      ...profile,
      hasUnseenStories: profile.stories.some(
        (story: StoryWithViews) => story.views.length === 0,
      ),
    };
  }

  async getStoriesFeed(profileId: string): Promise<UserStoryResponse[]> {
    const now = new Date();

    // 1. Fetch the Auth User first
    const authUserStories = await this.getProfileWithStories(
      profileId,
      profileId,
    );

    // 2. Fetch other users with active stories
    const othersWithStories = await this.prisma.profile.findMany({
      where: {
        id: { not: profileId },
        stories: { some: { expiresAt: { gt: now } } },
      },
      select: {
        id: true,
        username: true,
        avatarUrl: true,
        stories: {
          orderBy: { createdAt: "asc" },
          include: {
            views: {
              where: { viewerId: profileId },
              select: { viewerId: true },
            },
            _count: { select: { views: true } },
          },
        },
      },
    });

    // Map the "others" to include the hasUnseenStories flag
    const mappedOthers = othersWithStories.map((profile: any) => ({
      ...profile,
      hasUnseenStories: profile.stories.some(
        (story: StoryWithViews) => story.views.length === 0,
      ),
    }));

    // 3. Combine: Auth user story with other stories
    return authUserStories ? [authUserStories, ...mappedOthers] : mappedOthers;
  }

  async getStoryViewers(storyId: string): Promise<StoryView[]> {
    return await this.prisma.storyView.findMany({
      where: { storyId },
      select: {
        id: true,
        viewedAt: true,
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
    data: { mediaUrl: string; mediaType: MediaType },
  ): Promise<UserStoryResponse | null> {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    // Create the story
    await this.prisma.story.create({
      data: { ...data, authorId: userId, expiresAt },
    });

    // Return the updated profile shape for the cache
    return await this.getProfileWithStories(userId, userId);
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
