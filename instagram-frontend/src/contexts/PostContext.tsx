import { createContext, useContext, useState } from "react";
import type { PostData } from "../types/post";

interface PostContextType {
  post: PostData | null;
  isPostModalOpen: boolean;
  openPostModal: (postData: PostData) => void;
  closePostModal: () => void;
  updatePost: (updatedPost: PostData) => void;
}

export const PostContext = createContext<PostContextType | null>(null);

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [post, setPost] = useState<PostData | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const openPostModal = (postData: PostData) => {
    setPost(postData);
    setIsPostModalOpen(true);
  };

  const closePostModal = () => {
    setPost(null);
    setIsPostModalOpen(false);
  };

  const updatePost = (updatedPost: PostData) => {
    setPost({
      ...post,
      ...updatedPost,
    });
  };

  return (
    <PostContext.Provider
      value={{
        post,
        isPostModalOpen,
        openPostModal,
        closePostModal,
        updatePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePost must be used within a PostProvider");
  }
  return context;
};
