export interface StoryWithViews {
  id: string;
  mediaUrl: string;
  // Stored as a plain string in the DB ("IMAGE" | "VIDEO"); kept as string here
  // so it matches Prisma's inferred type without a cast.
  mediaType: string;
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
  avatarUrl: string | null;
}

export interface StoryView {
  id: string;
  viewedAt: Date;
  viewer: Viewer;
}
