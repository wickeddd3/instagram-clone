import type { Post } from "@/entities/post";
import { PostDetailsModal } from "./PostDetailsModal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { memo, useMemo, useState } from "react";

export const PostDetailsNavigationModal = memo(
  ({ posts, index }: { posts: Post[]; index: number }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(index);

    const activePost = useMemo(
      () => posts[currentIndex],
      [posts, currentIndex],
    );
    const hasPrevious = useMemo(() => currentIndex > 0, [currentIndex]);
    const hasNext = useMemo(
      () => currentIndex < posts.length - 1,
      [currentIndex, posts],
    );

    const navigateTo = (index: number) => {
      if (index < 0 || index >= posts.length) return;
      setCurrentIndex(index);
    };

    return (
      <div className="w-full h-full flex justify-center items-center gap-2">
        <button
          onClick={() => navigateTo(currentIndex - 1)}
          className={`bg-gray-100 rounded-full p-1 cursor-pointer ${!hasPrevious && "opacity-0"}`}
        >
          <ChevronLeft size={22} className="text-gray-950" />
        </button>
        <PostDetailsModal value={activePost} />
        <button
          onClick={() => navigateTo(currentIndex + 1)}
          className={`bg-gray-100 rounded-full p-1 cursor-pointer ${!hasNext && "opacity-0"}`}
        >
          <ChevronRight size={22} className="text-gray-950" />
        </button>
      </div>
    );
  },
);

PostDetailsNavigationModal.displayName = "PostDetailsNavigationModal";
