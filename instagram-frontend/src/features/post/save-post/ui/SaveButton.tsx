import type { Post } from "@/entities/post";
import { Bookmark } from "lucide-react";
import { useSavePost } from "../model/useSavePost";

export const SaveButton = ({ post }: { post: Post }) => {
  const { togglePostSave } = useSavePost({ post });

  const handleSaveClick = () => {
    togglePostSave({ variables: { postId: post.id } });
  };

  return (
    <button onClick={handleSaveClick} className="group relative">
      <Bookmark
        size={28}
        className={`transition-all duration-200 cursor-pointer ${
          post.isSaved
            ? "fill-white text-white"
            : "text-white group-hover:text-gray-400"
        }`}
      />
    </button>
  );
};
