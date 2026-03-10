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
}

export interface UserStory {
  id: string;
  username: string;
  avatarUrl: string;
  hasUnseenStories: boolean;
  stories: Story[];
}
