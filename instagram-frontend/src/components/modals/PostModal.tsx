import {
  X,
  MoreHorizontal,
  MessageCircle,
  Heart,
  Send,
  Bookmark,
} from "lucide-react";
import { motion } from "framer-motion";
import { usePost } from "../../contexts/PostContext";
import { useMutation } from "@apollo/client/react";
import { TOGGLE_POST_LIKE } from "../../graphql/mutations/profile";
import { formatDateToNow } from "../../utils/date";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PostModal = ({ isOpen, onClose }: CreatePostModalProps) => {
  const { post } = usePost();

  const [togglePostLike] = useMutation(TOGGLE_POST_LIKE);

  const handleTogglePostLike = () => {
    togglePostLike({ variables: { postId: post?.id } });
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
          <div className="border-b border-neutral-800 p-2 flex justify-between items-center">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center w-full gap-3">
                <div className="w-10 h-10 rounded-full p-0.5">
                  <div className="bg-black p-0.5 rounded-full w-full h-full">
                    <img
                      src={post?.author.avatarUrl || "/ig-default.jpg"}
                      alt={post?.author.username}
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                </div>
                <span className="font-semibold text-sm">
                  {post?.author.username}
                </span>
              </div>
              <MoreHorizontal
                className="cursor-pointer hover:text-gray-400"
                size={20}
              />
            </div>
          </div>

          {/* Post Comments Section */}
          <div className="h-full">comments</div>

          <div className="flex flex-col gap-3 mt-auto">
            {/* Post Actions */}
            <div className="flex justify-between items-center px-4">
              <div className="flex gap-4">
                <button onClick={handleTogglePostLike}>
                  <Heart
                    className={`cursor-pointer ${
                      post?.isLiked ? "text-red-500" : "hover:text-gray-400"
                    }`}
                    size={24}
                  />
                </button>
                <MessageCircle
                  className="cursor-pointer hover:text-gray-400"
                  size={24}
                />
                <Send
                  className="cursor-pointer hover:text-gray-400"
                  size={24}
                />
              </div>
              <Bookmark
                className="cursor-pointer hover:text-gray-400"
                size={24}
              />
            </div>
            <span className="text-gray-500 text-xs px-4">
              {formatDateToNow(post?.createdAt || "")}
            </span>
            <div className="mt-auto border-t p-4 border-neutral-800 text-gray-400 text-sm flex justify-between items-center cursor-pointer hover:bg-white/5">
              <span>Add comment</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
