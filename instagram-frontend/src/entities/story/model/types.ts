export interface Story {
  id: string;
  mediaUrl: string;
  mediaType: string;
  createdAt: string;
  expiresAt: string;
  author: {
    id: string;
    username: string;
    avatarUrl?: string;
  };
  viewsCount: number;
}

export interface UserStory {
  id: string;
  username: string;
  avatarUrl: string;
  hasUnseenStories: boolean;
  stories: Story[];
}

export interface StoryViewer {
  id: string;
  viewedAt: string;
  viewer: Viewer;
}

export interface Viewer {
  id: string;
  username: string;
  avatarUrl: string;
}
