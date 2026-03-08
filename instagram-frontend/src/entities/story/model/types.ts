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
