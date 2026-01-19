export interface CommentData {
  id: string;
  text: string;
  createdAt: string;
  author: {
    id: string;
    username: string;
    avatarUrl?: string;
  };
  repliesCount: number;
  likesCount: number;
  isLiked: boolean;
}

export interface CommentsData {
  getComments: {
    comments: CommentData[];
    hasMore: boolean;
    nextCursor: string;
  };
}
