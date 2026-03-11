export interface StoryViewers {
  getStoryViewers: StoryViewer[];
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
