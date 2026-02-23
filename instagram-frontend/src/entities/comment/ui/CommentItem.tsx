import { type ReactNode } from "react";
import type { Comment } from "../model/types";
import { CommentMessage } from "./CommentMessage";
import { Avatar } from "@/shared/ui/Avatar";
import { CommentLikes } from "./CommentLikes";
import { CommentDate } from "./CommentDate";

interface CommentItemProps {
  comment: Comment;
  likeButtonSlot?: ReactNode;
  replyButtonSlot?: ReactNode;
  repliesSlot?: ReactNode;
}

export const CommentItem = ({
  comment: {
    author: { username, avatarUrl },
    text,
    createdAt,
    likesCount,
  },
  likeButtonSlot,
  replyButtonSlot,
  repliesSlot,
}: CommentItemProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 items-start group">
        <Avatar imageUrl={avatarUrl} />
        <div className="flex-1 flex flex-col text-sm">
          <CommentMessage text={text} username={username} />
          <div className="flex gap-4 mt-2 text-xs text-gray-400">
            <CommentDate date={createdAt} />
            {likesCount > 0 && <CommentLikes likesCount={likesCount} />}
            {replyButtonSlot}
          </div>
        </div>
        {likeButtonSlot}
      </div>
      {repliesSlot}
    </div>
  );
};
