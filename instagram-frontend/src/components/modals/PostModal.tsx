import { X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation, useQuery } from "@apollo/client/react";
import { usePost } from "../../contexts/PostContext";
import { formatDateToNow } from "../../utils/date";
import { GET_COMMENTS } from "../../graphql/queries/comment";
import { ADD_COMMENT } from "../../graphql/mutations/comment";
import type { CommentsData } from "../../types/comment";
import { CommentList } from "../comments/CommentList";
import { PostActions } from "../posts/PostActions";
import { PostHeader } from "../posts/PostHeader";
import { EmptyComments } from "../comments/EmptyComments";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PostModal = ({ isOpen, onClose }: CreatePostModalProps) => {
  const { post } = usePost();

  const [text, setText] = useState("");
  const [replyData, setReplyData] = useState<{
    username: string;
    id: string;
  } | null>(null);

  const { data, loading } = useQuery<CommentsData>(GET_COMMENTS, {
    variables: { postId: post?.id },
    skip: !post?.id,
  });

  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [{ query: GET_COMMENTS, variables: { postId: post?.id } }],
  });

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    await addComment({
      variables: {
        postId: post?.id,
        text: replyData ? `@${replyData.username} ${text}` : text,
        parentId: replyData?.id,
      },
    });

    setText("");
    setReplyData(null);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-60"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
      >
        <X size={28} />
      </button>
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="bg-neutral-900 rounded-xl w-full max-w-5/6 h-full max-h-5/6 flex flex-col md:flex-row overflow-hidden"
      >
        <div className="w-full md:w-[60%] h-[400px] md:h-full flex items-center justify-center relative border-r border-gray-700">
          <img
            src={post?.imageUrl}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-[40%] flex flex-col bg-neutral-900">
          {/* Post Header */}
          <PostHeader className="p-3 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <PostHeader.AuthorAvatar
                avatarUrl={post?.author.avatarUrl}
                username={post?.author.username}
                className="w-10 h-10"
              />
              <PostHeader.AuthorUsername username={post?.author.username} />
            </div>
            <PostHeader.Options />
          </PostHeader>

          {/* Post Comments Section */}
          <div className="w-full h-full overflow-y-auto overscroll-contain no-scrollbar p-3">
            {loading ? (
              <div className="p-4 text-gray-500">Loading comments...</div>
            ) : data?.getComments.length ? (
              <CommentList
                comments={data?.getComments || []}
                postId={post?.id}
                onReplyClick={(username, id) => setReplyData({ username, id })}
              />
            ) : (
              <EmptyComments />
            )}
          </div>

          <div className="flex flex-col gap-3 mt-auto">
            {/* Post Actions */}
            <PostActions
              postId={post?.id || ""}
              isLiked={post?.isLiked || false}
              className="px-3"
            />

            {/* Likes & Date */}
            <div className="flex flex-col px-4">
              <span className="font-semibold text-sm">
                {post?.likesCount.toLocaleString()} likes
              </span>
              <span className="text-gray-500 text-xs">
                {formatDateToNow(post?.createdAt || "")}
              </span>
            </div>

            {/* Add Comment Field */}
            <div className="px-3 py-4 border-t border-neutral-800">
              {replyData && (
                <div className="text-xs text-gray-400 mb-2 flex justify-between">
                  <span>Replying to {replyData.username}</span>
                  <button
                    onClick={() => setReplyData(null)}
                    className="font-bold"
                  >
                    ✕
                  </button>
                </div>
              )}
              <form onSubmit={handleSend} className="flex items-center gap-3">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 bg-transparent border-none text-sm focus:ring-0 outline-none"
                />
                <button
                  type="submit"
                  disabled={!text.trim()}
                  className="text-white font-bold text-sm disabled:opacity-80"
                >
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
