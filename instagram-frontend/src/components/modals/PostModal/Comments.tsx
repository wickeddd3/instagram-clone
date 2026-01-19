import { useQuery } from "@apollo/client/react";
import { useEffect, useRef } from "react";
import { CommentList } from "./CommentList";
import { EmptyComments } from "./EmptyComments";
import { CommentSkeleton } from "../../loaders/CommentSkeleton";
import type { CommentsData } from "../../../types/comment";
import { GET_COMMENTS } from "../../../graphql/queries/comment";
import type { ReplyDataType } from "./AddComment";
import { Loader } from "lucide-react";

interface CommentsProps {
  postId: string;
  onReplyClick: (value: ReplyDataType | null) => void;
}

export const Comments = ({ postId, onReplyClick }: CommentsProps) => {
  const { data, loading, error, fetchMore } = useQuery<CommentsData>(
    GET_COMMENTS,
    {
      variables: { postId },
      skip: !postId,
    },
  );

  const {
    comments = [],
    hasMore = false,
    nextCursor = null,
  } = data?.getComments || {};

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only fetch more if there is more to fetch
    if (!sentinelRef.current || loading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMore({
            variables: { cursor: nextCursor },
          });
        }
      },
      { threshold: 0.8 },
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [nextCursor, hasMore, loading, fetchMore]);

  if (error) {
    return (
      <div className="flex w-full justify-center pt-20 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="flex-1 w-full flex flex-col overflow-y-auto overscroll-contain no-scrollbar p-3">
      {loading && !comments.length && (
        <div className="w-full flex flex-col gap-4">
          {[...Array(8)].map((_, i) => (
            <CommentSkeleton key={i} />
          ))}
        </div>
      )}

      {!!comments.length && (
        <CommentList
          comments={comments || []}
          postId={postId}
          onReplyClick={onReplyClick}
        />
      )}

      {!loading && !comments.length && <EmptyComments />}

      {hasMore && (
        <div
          ref={sentinelRef}
          className="w-full flex justify-center items-center py-2"
        >
          <Loader className="animate-spin text-gray-500" size={34} />
        </div>
      )}
    </div>
  );
};
