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

export interface FeedPostsdData {
  getFeedPosts: {
    posts: PostData[];
    hasMore: boolean;
    nextCursor: string;
  };
}

export interface ProfilePostsData {
  getProfilePosts: {
    posts: PostData[];
    hasMore: boolean;
    nextCursor: string;
  };
}

export interface SavedPostsData {
  getSavedPosts: PostData[];
}

export interface ExploreData {
  getExplorePosts: PostData[];
}

export interface CreatedPost {
  createPost: PostData;
}
