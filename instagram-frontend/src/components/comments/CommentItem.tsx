import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Heart, Loader } from "lucide-react";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import type { CommentData, CommentsData } from "../../types/comment";
import { GET_COMMENTS } from "../../graphql/queries/comment";
import { CommentList } from "./CommentList";
import { TOGGLE_COMMENT_LIKE } from "../../graphql/mutations/comment";

interface CommentItemProps {
  postId?: string;
  comment: CommentData;
  onReplyClick: (username: string, id: string) => void;
}

export const CommentItem = ({
  postId,
  comment: {
    id,
    author: { username, avatarUrl },
    text,
    createdAt,
    isLiked,
    repliesCount,
  },
  onReplyClick,
}: CommentItemProps) => {
  const [showReplies, setShowReplies] = useState(false);

  const [getComments, { data, loading }] =
    useLazyQuery<CommentsData>(GET_COMMENTS);

  const [toggleCommentLike] = useMutation(TOGGLE_COMMENT_LIKE);

  const handleFetchReplies = () => {
    setShowReplies(!showReplies);
    getComments({ variables: { postId: postId, parentId: id } });
  };

  const handleToggleCommentLike = () => {
    toggleCommentLike({ variables: { commentId: id } });
  };

  return (
    <div className="flex flex-col gap-3 py-3">
      <div className="flex gap-3 items-start group">
        <img
          src={avatarUrl || "/default-avatar.png"}
          className="w-8 h-8 rounded-full object-cover"
        />

        <div className="flex-1 flex flex-col text-sm">
          <div>
            <span className="font-bold mr-2">{username}</span>
            <span className="text-white/90">{text}</span>
          </div>

          <div className="flex gap-4 mt-2 text-xs text-gray-400 font-semibold">
            <span>{formatDistanceToNow(new Date(createdAt))}</span>
            <button
              onClick={() => onReplyClick(username, id)}
              className="hover:text-white"
            >
              Reply
            </button>
          </div>
        </div>

        <button onClick={handleToggleCommentLike}>
          <Heart
            size={14}
            className={`cursor-pointer ${
              isLiked ? "text-red-500" : "hover:text-red-500"
            }`}
          />
        </button>
      </div>

      {/* View Replies Toggle */}
      {repliesCount > 0 && (
        <div className="ml-11">
          <button
            onClick={handleFetchReplies}
            className="flex items-center gap-4 text-xs text-gray-400 font-semibold hover:text-white mb-2 cursor-pointer"
          >
            <div className="w-6 border-t border-gray-600" />
            {showReplies ? "Hide replies" : `View replies (${repliesCount})`}
            {loading && <Loader className="animate-spin" size={14} />}
          </button>

          {showReplies && (
            <CommentList
              comments={data?.getComments || []}
              postId={postId}
              onReplyClick={onReplyClick}
            />
          )}
        </div>
      )}
    </div>
  );
};
