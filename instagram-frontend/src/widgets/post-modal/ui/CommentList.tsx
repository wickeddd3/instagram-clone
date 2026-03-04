import { useInView } from "react-intersection-observer";
import { useInfiniteComment } from "./../model/useInfiniteComment";
import {
  CommentItem,
  CommentSkeleton,
  EmptyComments,
  ReplyButton,
  type Comment,
} from "@/entities/comment";
import { Spinner } from "@/shared/ui/Spinner";
import { LikeButton } from "@/features/comment/like-comment";
import { ReplyList } from "./ReplyList";
import { memo, useCallback, useMemo } from "react";

export const CommentList = memo(
  ({
    postId,
    onReplyClick,
  }: {
    postId: string;
    onReplyClick: (value: Comment) => void;
  }) => {
    const { comments, hasMore, loading, isLoadingMore, loadMore } =
      useInfiniteComment({ postId });

    const handleInViewChange = useCallback(
      (inView: boolean) => {
        if (inView && hasMore && !isLoadingMore) {
          loadMore();
        }
      },
      [hasMore, isLoadingMore, loadMore],
    );

    const { ref } = useInView({
      onChange: handleInViewChange,
    });

    const renderedComments = useMemo(() => {
      return comments.map((comment) => (
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
      ));
    }, [comments, postId, onReplyClick]);

    return (
      <div className="flex-1 w-full flex flex-col p-3">
        {/* Show skeleton loaders while the initial comments are loading */}
        {loading && !comments.length && (
          <div className="w-full flex flex-col gap-6">
            {[...Array(8)].map((_, i) => (
              <CommentSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Render comments once loaded */}
        <div className="w-full flex-1 flex flex-col gap-4">
          {renderedComments}
        </div>

        {/* Empty comments placeholder */}
        {!loading && !comments.length && <EmptyComments />}

        {/* Sentinel for Infinite Scrolling */}
        {hasMore && (
          <div
            ref={ref}
            className="w-full flex justify-center items-center py-2"
          >
            <Spinner />
          </div>
        )}
      </div>
    );
  },
);

CommentList.displayName = "CommentList";
