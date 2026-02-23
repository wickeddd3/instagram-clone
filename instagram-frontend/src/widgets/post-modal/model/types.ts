import type { Comment } from "@/entities/comment";

export interface Comments {
  getComments: {
    comments: Comment[];
    hasMore: boolean;
    nextCursor: string;
  };
}

export type ReplyData = {
  username: string;
  id: string;
};
