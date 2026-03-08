import type { Story } from "@/entities/story";

export interface UserStory {
  id: string;
  username: string;
  avatarUrl: string;
  hasUnseenStories: boolean;
  stories: Story[];
}

export interface StoriesFeed {
  getStoriesFeed: UserStory[];
}
