import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
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
  const commentInputRef = useRef<HTMLInputElement>(null);

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

  const handleReplyClick = (replyData: ReplyDataType | null) => {
    setReplyData(replyData);
    setText(`@${replyData?.username}`);
    commentInputRef.current?.focus();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-60"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-2.5 text-white hover:text-gray-300 z-70 cursor-pointer"
      >
        <X size={28} />
      </button>
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="bg-neutral-900 w-4/5 h-4/5 md:h-[90vh] md:max-w-5/6 lg:max-w-4/5 flex flex-col md:flex-row rounded-xl overflow-hidden"
      >
        {/* MOBILE HEADER: Shown only on small screens */}
        <div className="md:hidden border-b border-neutral-800">
          <PostHeader className="p-3">
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
        </div>

        {/* IMAGE SECTION */}
        <div className="w-full max-h-1/2 md:max-h-full md:w-[60%] bg-black flex items-center justify-center relative md:border-r border-neutral-800">
          <img
            src={post?.imageUrl}
            alt="Preview"
            className="w-full h-full md:h-auto object-contain"
          />
        </div>

        {/* CONTENT SECTION (Header, Comments, Actions) */}
        <div className="w-full md:w-[40%] flex flex-col bg-neutral-900">
          {/* DESKTOP HEADER: Hidden on small screens */}
          <PostHeader className="hidden md:flex p-3 border-b border-neutral-800">
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

          {/* ACTIONS SECTION (On mobile, this comes right after the image) */}
          <div className="flex flex-col order-first md:order-last">
            <PostActions className="px-3 pt-2">
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
            <div className="flex flex-col px-4 md:py-2">
              <span className="font-medium text-sm py-2 md:py-0">
                {post?.likesCount.toLocaleString()} likes
              </span>
              <span className="text-gray-500 text-xs">
                {formatDateToNow(post?.createdAt || "")}
              </span>
            </div>

            {/* Desktop Add Comment stays here */}
            <div className="hidden md:block border-t border-neutral-800">
              <AddComment
                postId={post?.id || ""}
                text={text}
                setText={setText}
                replyData={replyData}
                setReplyData={setReplyData}
                inputRef={commentInputRef}
              />
            </div>
          </div>

          {/* COMMENTS SECTION */}
          {/* On mobile, this grows to fill space; on desktop, it occupies the middle */}
          <div className="flex-1 overflow-y-auto max-h-[165px] md:max-h-full overscroll-contain no-scrollbar">
            <Comments postId={post?.id || ""} onReplyClick={handleReplyClick} />
          </div>

          {/* MOBILE FIXED BOTTOM INPUT */}
          <div className="md:hidden sticky bottom-0 border-t border-neutral-800 bg-neutral-900">
            <AddComment
              postId={post?.id || ""}
              text={text}
              setText={setText}
              replyData={replyData}
              setReplyData={setReplyData}
              inputRef={commentInputRef}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
