import { useMutation } from "@apollo/client/react";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import { TOGGLE_POST_LIKE } from "../../graphql/mutations/post";

interface PostActionsProps {
  isLiked: boolean;
  postId: string;
  className?: string;
}

export const PostActions = ({
  postId,
  isLiked,
  className,
}: PostActionsProps) => {
  const [togglePostLike] = useMutation(TOGGLE_POST_LIKE);

  const handleTogglePostLike = () => {
    togglePostLike({ variables: { postId } });
  };

  return (
    <div
      className={`flex justify-between items-center text-white ${className}`}
    >
      <div className="flex items-center gap-4">
        <button onClick={handleTogglePostLike}>
          <Heart
            className={`cursor-pointer ${
              isLiked ? "text-red-500" : "hover:text-red-500"
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
  );
};
