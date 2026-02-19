import { useState } from "react";
import { useAddComment } from "../model/useAddComment";

export const AddCommentField = ({
  postId,
  inputRef,
}: {
  postId: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
}) => {
  const { addComment } = useAddComment({ postId });
  const [text, setText] = useState("");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const commentText = text;
    setText(""); // Clear input immediately for better UX

    try {
      await addComment({
        variables: { postId, text: commentText },
      });
    } catch (err) {
      console.error(err);
      setText(commentText); // Put text back if it fails
    }
  };

  return (
    <form onSubmit={handleSend} className="flex items-center gap-3 py-1">
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
        className="flex-1 bg-transparent border-none text-sm focus:ring-0 outline-none"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="text-white font-bold text-sm disabled:opacity-80"
      >
        Post
      </button>
    </form>
  );
};
