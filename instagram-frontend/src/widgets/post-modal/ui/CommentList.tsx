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
import { memo } from "react";
import { Virtuoso } from "react-virtuoso";

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

    const handleLoadMore = () => {
      if (hasMore && !isLoadingMore) {
        loadMore();
      }
    };

    if (loading && !comments.length) {
      return (
        <div className="w-full flex flex-col gap-6 p-3">
          {[...Array(8)].map((_, i) => (
            <CommentSkeleton key={i} />
          ))}
        </div>
      );
    }

    if (!loading && !comments.length) {
      return <EmptyComments />;
    }

    return (
      <div className="h-full w-full py-3 pl-3 pr-1">
        <Virtuoso
          className="custom-scrollbar"
          style={{ height: "100%" }}
          totalCount={comments.length}
          data={comments}
          overscan={200}
          endReached={handleLoadMore}
          itemContent={(index, comment) => (
            <CommentItem
              key={index}
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
          )}
          components={{
            Footer: () => (
              <div className="w-full flex flex-col items-center pb-5">
                {hasMore && <Spinner />}
              </div>
            ),
          }}
        />
      </div>
    );
  },
);

CommentList.displayName = "CommentList";
