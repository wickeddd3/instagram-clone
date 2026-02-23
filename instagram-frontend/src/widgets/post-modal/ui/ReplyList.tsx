import { useMemo, useState } from "react";
import { useInfiniteReply } from "../model/useInfiniteReply";
import { Spinner } from "@/shared/ui/Spinner";
import { CommentItem, ReplyButton, type Comment } from "@/entities/comment";
import { LikeButton } from "@/features/comment/like-comment";

export const ReplyList = ({
  repliesCount,
  postId,
  commentId,
  onReplyClick,
}: {
  repliesCount: number;
  postId: string;
  commentId: string;
  onReplyClick: (value: Comment) => void;
}) => {
  if (!repliesCount) return;

  const { getComments, loading, comments, loadMore } = useInfiniteReply();

  const [showReplies, setShowReplies] = useState(false);
  const limit = 5;

  const loadedRepliesCount = useMemo(() => comments.length, [comments]);
  const remainingRepliesCount = useMemo(
    () => repliesCount - loadedRepliesCount,
    [repliesCount, loadedRepliesCount],
  );
  const hasMoreReplies = useMemo(
    () => remainingRepliesCount > 0,
    [remainingRepliesCount],
  );

  const handleFetchReplies = () => {
    if (loadedRepliesCount === 0) {
      setShowReplies(true);
      getComments({
        variables: { postId: postId, parentId: commentId, limit },
      });
      return;
    }

    if (hasMoreReplies) {
      loadMore();
      return;
    }

    setShowReplies(!showReplies);
  };

  return (
    <div className="flex flex-col gap-4 pl-11">
      <div className="w-full flex-1 flex flex-col gap-4">
        {showReplies &&
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              likeButtonSlot={<LikeButton comment={comment} />}
              replyButtonSlot={
                <ReplyButton onClick={() => onReplyClick(comment)} />
              }
              repliesSlot={
                <ReplyList
                  repliesCount={comment.repliesCount}
                  postId={postId}
                  commentId={comment.id}
                  onReplyClick={onReplyClick}
                />
              }
            />
          ))}
      </div>
      <button
        onClick={handleFetchReplies}
        className="flex items-center gap-4 text-xs text-gray-400 font-semibold hover:text-white mb-2 cursor-pointer"
      >
        <div className="w-6 border-t border-gray-600" />
        {!showReplies
          ? `View replies (${repliesCount})`
          : hasMoreReplies
            ? `View more (${remainingRepliesCount})`
            : "Hide replies"}
        {loading && <Spinner size={14} />}
      </button>
    </div>
  );
};
