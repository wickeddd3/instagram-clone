import { useQuery } from "@apollo/client/react";
import { CommentList } from "./CommentList";
import { EmptyComments } from "./EmptyComments";
import { CommentSkeleton } from "../../loaders/CommentSkeleton";
import type { CommentsData } from "../../../types/comment";
import { GET_COMMENTS } from "../../../graphql/queries/comment";
import type { ReplyDataType } from "./AddComment";

interface CommentsProps {
  postId: string;
  onReplyClick: (value: ReplyDataType | null) => void;
}

export const Comments = ({ postId, onReplyClick }: CommentsProps) => {
  const { data, loading } = useQuery<CommentsData>(GET_COMMENTS, {
    variables: { postId },
    skip: !postId,
  });

  return (
    <div className="w-full h-full overflow-y-auto overscroll-contain no-scrollbar p-3">
      {loading ? (
        <div className="w-full flex flex-col gap-4">
          {[...Array(8)].map((_, i) => (
            <CommentSkeleton key={i} />
          ))}
        </div>
      ) : data?.getComments.length ? (
        <CommentList
          comments={data?.getComments || []}
          postId={postId}
          onReplyClick={onReplyClick}
        />
      ) : (
        <EmptyComments />
      )}
    </div>
  );
};
