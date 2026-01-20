import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Heart, Loader } from "lucide-react";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import type { CommentData, CommentsData } from "../../../types/comment";
import { GET_COMMENTS } from "../../../graphql/queries/comment";
import { CommentList } from "./CommentList";
import { TOGGLE_COMMENT_LIKE } from "../../../graphql/mutations/comment";
import type { ReplyDataType } from "./AddComment";

interface CommentItemProps {
  postId?: string;
  comment: CommentData;
  onReplyClick: (value: ReplyDataType | null) => void;
}

export const CommentItem = ({
  postId,
  comment: {
    id,
    author: { username, avatarUrl },
    text,
    createdAt,
    isLiked,
    likesCount,
    repliesCount,
  },
  onReplyClick,
}: CommentItemProps) => {
  const [showReplies, setShowReplies] = useState(false);
  const [animate, setAnimate] = useState(false);

  const [getComments, { data, loading }] =
    useLazyQuery<CommentsData>(GET_COMMENTS);

  const {
    comments = [],
    // hasMore = false,
    // nextCursor = null,
  } = data?.getComments || {};

  const [toggleCommentLike] = useMutation(TOGGLE_COMMENT_LIKE, {
    optimisticResponse: (vars) => ({
      toggleCommentLike: {
        id: vars.commentId,
        isLiked: !isLiked,
        likesCount: isLiked ? likesCount - 1 : likesCount + 1,
        __typename: "CommentLikeResponse",
      },
    }),
    // This update function links the Response to the Post object in cache
    update(cache, { data: { toggleCommentLike } }: any) {
      cache.modify({
        id: cache.identify({ __typename: "Comment", id }),
        fields: {
          isLiked: () => toggleCommentLike.isLiked,
          likesCount: () => toggleCommentLike.likesCount,
        },
      });
    },
  });

  const handleFetchReplies = () => {
    setShowReplies(!showReplies);
    getComments({ variables: { postId: postId, parentId: id } });
  };

  const handleToggleCommentLike = () => {
    setAnimate(true);
    // Reset animation class after 450ms
    setTimeout(() => setAnimate(false), 450);
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
          <div className="flex flex-wrap">
            <span className="font-bold mr-2">{username}</span>
            <span className="text-white/90">{text}</span>
          </div>

          <div className="flex gap-4 mt-2 text-xs text-gray-400 font-semibold">
            <span>{formatDistanceToNow(new Date(createdAt))}</span>
            {likesCount > 0 && (
              <span>
                {likesCount === 1
                  ? `${likesCount} like`
                  : `${likesCount} likes`}
              </span>
            )}
            <button
              onClick={() => onReplyClick({ username, id })}
              className="hover:text-white cursor-pointer"
            >
              Reply
            </button>
          </div>
        </div>

        <button onClick={handleToggleCommentLike}>
          <Heart
            size={14}
            className={`transition-all duration-200 cursor-pointer ${
              isLiked
                ? "fill-red-500 text-red-500"
                : "text-white group-hover:text-gray-400"
            } ${animate ? "animate-like-heart" : ""}`}
          />
        </button>
      </div>

      {/* View Replies Toggle */}
      {repliesCount > 0 && (
        <div className="pl-11">
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
              comments={comments || []}
              postId={postId}
              onReplyClick={onReplyClick}
            />
          )}
        </div>
      )}
    </div>
  );
};
