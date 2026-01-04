import { useMutation } from "@apollo/client/react";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { TOGGLE_POST_LIKE } from "../graphql/mutations/profile";
import type { PostData } from "../types/post";
import { formatDateToNow } from "../utils/date";
import { AddComment } from "./comments/AddComment";
import { usePost } from "../contexts/PostContext";

interface PostProps {
  post: PostData;
}

export const Post = ({
  post,
  post: {
    id,
    author: { username, avatarUrl },
    imageUrl,
    likesCount,
    caption,
    createdAt,
    isLiked,
  },
}: PostProps) => {
  const { openPostModal } = usePost();

  const [togglePostLike] = useMutation(TOGGLE_POST_LIKE);

  const handleTogglePostLike = () => {
    togglePostLike({ variables: { postId: id } });
  };

  return (
    <article className="w-full max-w-[470px] mx-auto">
      {/* Post Header */}
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-linear-to-tr from-yellow-400 to-purple-600 p-0.5">
            <div className="bg-black p-0.5 rounded-full w-full h-full">
              <img
                src={avatarUrl || "/ig-default.jpg"}
                alt={username}
                className="rounded-full w-full h-full object-cover"
              />
            </div>
          </div>
          <span className="font-semibold text-sm">{username}</span>
          <span className="text-gray-500 text-sm">
            • {formatDateToNow(createdAt)}
          </span>
        </div>
        <MoreHorizontal
          className="cursor-pointer hover:text-gray-400"
          size={20}
        />
      </div>

      {/* Post Image */}
      <div className="rounded-sm overflow-hidden border border-gray-800">
        <img
          src={imageUrl}
          alt="Post content"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Post Actions */}
      <div className="flex justify-between items-center pt-3 pb-2">
        <div className="flex gap-4">
          <button onClick={handleTogglePostLike}>
            <Heart
              className={`cursor-pointer ${
                isLiked ? "text-red-500" : "hover:text-gray-400"
              }`}
              size={24}
            />
          </button>
          <MessageCircle
            className="cursor-pointer hover:text-gray-400"
            size={24}
          />
          <Send className="cursor-pointer hover:text-gray-400" size={24} />
        </div>
        <Bookmark className="cursor-pointer hover:text-gray-400" size={24} />
      </div>

      {/* Likes & Caption */}
      <div className="space-y-1">
        <div className="font-semibold text-sm">
          {likesCount.toLocaleString()} likes
        </div>
        <div className="text-sm">
          <span className="font-semibold mr-2">{username}</span>
          {caption}
        </div>
        <div
          onClick={() => openPostModal(post)}
          className="text-gray-500 text-sm cursor-pointer"
        >
          View all 12 comments
        </div>
      </div>

      <AddComment postId={id} />
    </article>
  );
};
