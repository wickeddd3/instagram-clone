import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { ADD_COMMENT } from "../../graphql/mutations/comment";

export const AddComment = ({ postId }: { postId: string }) => {
  const [text, setText] = useState("");

  const [addComment] = useMutation(ADD_COMMENT);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    await addComment({
      variables: {
        postId,
        text: text,
      },
    });

    setText("");
  };

  return (
    <form onSubmit={handleSend} className="flex items-center gap-3 py-1">
      <input
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
