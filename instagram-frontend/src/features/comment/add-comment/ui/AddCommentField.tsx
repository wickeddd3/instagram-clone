import { forwardRef, memo, useCallback, useEffect, useState } from "react";
import { useAddComment } from "../model/useAddComment";

export const AddCommentField = memo(
  forwardRef<
    HTMLInputElement,
    {
      postId: string;
      replyData?: { username: string; id: string } | null;
      formClassName?: string;
      onCompleted?: () => void;
    }
  >(({ postId, replyData, formClassName, onCompleted }, ref) => {
    const { addComment } = useAddComment();
    const [text, setText] = useState("");

    const handleSend = useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedText = text.trim();
        if (!trimmedText) return;

        setText(""); // Clear input immediately for better UX

        try {
          await addComment({
            variables: {
              postId,
              text: trimmedText,
              ...(replyData?.id && { parentId: replyData?.id }),
            },
          });
          onCompleted?.();
        } catch (err) {
          setText(trimmedText); // Put text back if it fails
        }
      },
      [text, postId, replyData, addComment],
    );

    useEffect(() => {
      if (replyData && ref && "current" in ref) {
        setText(`@${replyData?.username} `);
        setTimeout(() => ref.current?.focus(), 50);
      }
    }, [replyData, ref]);

    return (
      <form
        onSubmit={handleSend}
        className={`flex items-center gap-3 py-1 ${formClassName}`}
      >
        <input
          ref={ref}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 bg-transparent border-none text-sm focus:ring-0 outline-none"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="text-white font-bold text-sm disabled:opacity-80 cursor-pointer"
        >
          Post
        </button>
      </form>
    );
  }),
);

AddCommentField.displayName = "AddCommentField";
