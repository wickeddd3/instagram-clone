import type { StoryViewer } from "@/entities/story";

export interface StoryViewers {
  getStoryViewers: StoryViewer[];
}

export interface ViewStoryData {
  viewStory: boolean | null;
}

export interface ViewStoryVars {
  storyId: string;
}
