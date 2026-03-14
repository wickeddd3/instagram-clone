export interface Post {
  id: string;
  imageUrl: string;
  caption?: string;
  createdAt: string;
  author: {
    id: string;
    username: string;
    avatarUrl: string;
    isFollowing: boolean;
    followersCount: number;
  };
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  isSaved: boolean;
  isFollowing?: boolean;
}
