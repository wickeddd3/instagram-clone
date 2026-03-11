export type MediaType = "IMAGE" | "VIDEO";

export interface StoryWithViews {
  id: string;
  mediaUrl: string;
  mediaType: MediaType;
  createdAt: Date;
  expiresAt: Date;
  views: { viewerId: string }[];
  _count: { views: number };
}

export interface UserStoryResponse {
  id: string;
  username: string;
  avatarUrl: string | null;
  hasUnseenStories: boolean;
  stories: StoryWithViews[];
}

export interface Viewer {
  id: string;
  username: string;
  avatarUrl: string;
}

export interface StoryView {
  id: string;
  viewedAt: string;
  viewer: Viewer;
}
