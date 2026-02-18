import { createContext, useContext, useState, type ReactNode } from "react";
import type { PostData } from "../../types/post";

interface PostContextType {
  post: PostData | null;
  selectPost: (postData: PostData | null) => void;
  updateSelectedPost: (updatedPost: PostData) => void;
  resetSelectedPost: () => void;
}

export const PostContext = createContext<PostContextType | null>(null);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [post, setPost] = useState<PostData | null>(null);

  const selectPost = (postData: PostData | null) => {
    setPost(postData);
  };

  const updateSelectedPost = (updatedPost: PostData) => {
    setPost({
      ...post,
      ...updatedPost,
    });
  };

  const resetSelectedPost = () => {
    setPost(null);
  };

  return (
    <PostContext.Provider
      value={{
        post,
        selectPost,
        updateSelectedPost,
        resetSelectedPost,
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
