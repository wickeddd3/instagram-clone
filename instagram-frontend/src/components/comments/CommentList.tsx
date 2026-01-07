import type { CommentData } from "../../types/comment";
import { CommentItem } from "./CommentItem";

interface CommentListProps {
  loading: boolean;
  comments: CommentData[];
  postId?: string;
  onReplyClick: (username: string, id: string) => void;
}

export const CommentList = ({
  loading,
  comments,
  postId,
  onReplyClick,
}: CommentListProps) => {
  return (
    <div className="w-full h-full">
      {loading ? (
        <div className="p-4 text-gray-500">Loading comments...</div>
      ) : (
        <div className="flex flex-col gap-2">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              postId={postId}
              comment={comment}
              onReplyClick={onReplyClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};
