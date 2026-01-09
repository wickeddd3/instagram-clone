export interface PostData {
  id: string;
  imageUrl: string;
  caption?: string;
  createdAt: string;
  author: {
    username: string;
    avatarUrl?: string;
  };
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  isSaved: boolean;
}

export interface FeedData {
  getFeed: PostData[];
}

export interface ProfilePostsData {
  getProfilePosts: PostData[];
}

export interface SavedPostsData {
  getSavedPosts: PostData[];
}
