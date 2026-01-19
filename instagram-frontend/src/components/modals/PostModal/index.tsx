import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { usePost } from "../../../contexts/PostContext";
import { formatDateToNow } from "../../../utils/date";
import { PostActions } from "../../posts/PostActions";
import { PostHeader } from "../../posts/PostHeader";
import { Comments } from "./Comments";
import { AddComment, type ReplyDataType } from "./AddComment";
import { usePostActions } from "../../../hooks/usePostActions";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PostModal = ({ isOpen, onClose }: PostModalProps) => {
  if (!isOpen) return null;

  const { post, updatePost } = usePost();

  if (!post) return null;

  const { togglePostLike, togglePostSave } = usePostActions({ post });

  const [text, setText] = useState("");
  const [replyData, setReplyData] = useState<ReplyDataType | null>(null);

  const handleLikeClick = () => {
    togglePostLike({
      variables: { postId: post?.id },
    });
    updatePost({
      ...post,
      isLiked: !post.isLiked,
      likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1,
    });
  };

  const handleBookmarkClick = () => {
    togglePostSave({ variables: { postId: post?.id } });
    updatePost({
      ...post,
      isSaved: !post.isSaved,
    });
  };

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

          <Comments postId={post?.id || ""} onReplyClick={setReplyData} />

          <div className="flex flex-col gap-3 mt-auto">
            <PostActions className="px-3 pt-1">
              <div className="flex items-center gap-4">
                <PostActions.LikeButton
                  isLiked={post?.isLiked || false}
                  onClick={handleLikeClick}
                />
                <PostActions.CommentButton />
                <PostActions.ChatButton />
              </div>
              <PostActions.BookmarkButton
                isSaved={post?.isSaved || false}
                onClick={handleBookmarkClick}
              />
            </PostActions>

            {/* Likes & Date */}
            <div className="flex flex-col px-4">
              <span className="font-semibold text-sm">
                {post?.likesCount.toLocaleString()} likes
              </span>
              <span className="text-gray-500 text-xs">
                {formatDateToNow(post?.createdAt || "")}
              </span>
            </div>

            <AddComment
              postId={post?.id || ""}
              text={text}
              setText={setText}
              replyData={replyData}
              setReplyData={setReplyData}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
