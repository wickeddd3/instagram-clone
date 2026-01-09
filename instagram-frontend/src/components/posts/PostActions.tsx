import { useMutation } from "@apollo/client/react";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import {
  TOGGLE_POST_LIKE,
  TOGGLE_POST_SAVE,
} from "../../graphql/mutations/post";

interface PostActionsProps {
  postId: string;
  isLiked: boolean;
  isSaved: boolean;
  className?: string;
}

export const PostActions = ({
  postId,
  isLiked,
  isSaved,
  className,
}: PostActionsProps) => {
  const [togglePostLike] = useMutation(TOGGLE_POST_LIKE);
  const [togglePostSave] = useMutation(TOGGLE_POST_SAVE);

  const handleTogglePostLike = () => {
    togglePostLike({ variables: { postId } });
  };

  const handleTogglePostSave = () => {
    togglePostSave({ variables: { postId } });
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
      <button onClick={handleTogglePostSave}>
        <Bookmark
          className={`cursor-pointer ${
            isSaved
              ? "text-gray-400 hover:text-white"
              : "text-white hover:text-gray-400"
          }`}
          size={24}
        />
      </button>
    </div>
  );
};
