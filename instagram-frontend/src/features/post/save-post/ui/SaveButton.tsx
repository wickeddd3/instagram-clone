import type { Post } from "@/entities/post";
import { Bookmark } from "lucide-react";
import { useSavePost } from "../model/useSavePost";
import { memo, useCallback } from "react";

export const SaveButton = memo(
  ({ post, callback }: { post: Post; callback?: () => void }) => {
    const { togglePostSave } = useSavePost({ post });

    const handleSaveClick = useCallback(() => {
      togglePostSave({ variables: { postId: post.id } });
      callback?.();
    }, [post.id, togglePostSave, callback]);

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
  },
);

SaveButton.displayName = "SaveButton";
