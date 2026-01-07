import type { CommentData } from "../../types/comment";
import { CommentItem } from "./CommentItem";

interface CommentListProps {
  comments: CommentData[];
  postId?: string;
  onReplyClick: (username: string, id: string) => void;
}

export const CommentList = ({
  comments,
  postId,
  onReplyClick,
}: CommentListProps) => {
  return (
    <div className="w-full h-full flex flex-col gap-2">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          postId={postId}
          comment={comment}
          onReplyClick={onReplyClick}
        />
      ))}
    </div>
  );
};
