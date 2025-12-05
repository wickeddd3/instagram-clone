import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";

interface PostProps {
  username: string;
  avatar: string;
  imageUrl: string;
  likes: number;
  caption: string;
  timeAgo: string;
}

export const Post = ({
  username,
  avatar,
  imageUrl,
  likes,
  caption,
  timeAgo,
}: PostProps) => {
  return (
    <article className="w-full max-w-[470px] border-b border-gray-800 pb-4 mb-4 mx-auto">
      {/* Post Header */}
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-linear-to-tr from-yellow-400 to-purple-600 p-0.5">
            <div className="bg-black p-0.5 rounded-full w-full h-full">
              <img
                src={avatar}
                alt={username}
                className="rounded-full w-full h-full object-cover"
              />
            </div>
          </div>
          <span className="font-semibold text-sm">{username}</span>
          <span className="text-gray-500 text-sm">• {timeAgo}</span>
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
          <Heart className="cursor-pointer hover:text-gray-400" size={24} />
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
          {likes.toLocaleString()} likes
        </div>
        <div className="text-sm">
          <span className="font-semibold mr-2">{username}</span>
          {caption}
        </div>
        <div className="text-gray-500 text-sm cursor-pointer">
          View all 12 comments
        </div>
        <div className="text-gray-500 text-xs uppercase pt-1">
          Add a comment...
        </div>
      </div>
    </article>
  );
};
