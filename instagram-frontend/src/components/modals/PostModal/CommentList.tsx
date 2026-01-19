import type { CommentData } from "../../../types/comment";
import type { ReplyDataType } from "./AddComment";
import { CommentItem } from "./CommentItem";

interface CommentListProps {
  comments: CommentData[];
  postId?: string;
  onReplyClick: (value: ReplyDataType | null) => void;
}

export const CommentList = ({
  comments,
  postId,
  onReplyClick,
}: CommentListProps) => {
  return (
    <div className="w-full flex-1 flex flex-col gap-2">
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
