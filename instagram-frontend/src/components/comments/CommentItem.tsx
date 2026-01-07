import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Heart } from "lucide-react";
import { useLazyQuery } from "@apollo/client/react";
import type { CommentsData } from "../../types/comment";
import { GET_COMMENTS } from "../../graphql/queries/comment";

interface CommentItemProps {
  postId?: string;
  comment: any;
  onReplyClick: (username: string, id: string) => void;
}

export const CommentItem = ({
  postId,
  comment,
  onReplyClick,
}: CommentItemProps) => {
  const [getComments, { data, loading }] =
    useLazyQuery<CommentsData>(GET_COMMENTS);

  const handleFetchReplies = () => {
    setShowReplies(!showReplies);
    getComments({ variables: { postId: postId, parentId: comment.id } });
  };

  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="flex flex-col gap-3 py-3">
      <div className="flex gap-3 items-start group">
        <img
          src={comment.author.avatarUrl || "/default-avatar.png"}
          className="w-8 h-8 rounded-full object-cover"
        />

        <div className="flex-1 flex flex-col text-sm">
          <div>
            <span className="font-bold mr-2">{comment.author.username}</span>
            <span className="text-white/90">{comment.text}</span>
          </div>

          <div className="flex gap-4 mt-2 text-xs text-gray-400 font-semibold">
            <span>{formatDistanceToNow(new Date(comment.createdAt))}</span>
            <button
              onClick={() => onReplyClick(comment.author.username, comment.id)}
              className="hover:text-white"
            >
              Reply
            </button>
          </div>
        </div>

        <button className="pt-1 text-gray-300 hover:text-red-500 transition cursor-pointer">
          <Heart size={14} />
        </button>
      </div>

      {/* View Replies Toggle */}
      {comment.repliesCount > 0 && (
        <div className="ml-11">
          <button
            onClick={handleFetchReplies}
            className="flex items-center gap-4 text-xs text-gray-400 font-semibold hover:text-white mb-2"
          >
            <div className="w-6 border-t border-gray-600" />
            {showReplies
              ? "Hide replies"
              : `View replies (${comment.repliesCount})`}
          </button>

          {showReplies &&
            (loading ? (
              <div className="p-4 text-gray-500">Loading comments...</div>
            ) : (
              <div className="flex flex-col gap-2">
                {data?.getComments?.map((reply) => (
                  <CommentItem
                    key={reply.id}
                    postId={postId}
                    comment={reply}
                    onReplyClick={onReplyClick}
                  />
                ))}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
