import { useMutation } from "@apollo/client/react";
import { ADD_COMMENT } from "../api/mutation";

export const useAddComment = ({ postId }: { postId: string }) => {
  const [addComment] = useMutation(ADD_COMMENT, {
    update(cache, { data: { addComment } }: any) {
      const newComment = addComment;
      if (!newComment) return;

      // Write the new comment into that specific bucket
      cache.modify({
        fields: {
          getComments(existingCommentData, { storeFieldName }) {
            if (!storeFieldName.includes(postId)) return existingCommentData;

            return {
              ...existingCommentData,
              comments: [...existingCommentData.comments, newComment],
            };
          },
        },
      });

      // Update the total count on the Post object
      cache.modify({
        id: cache.identify({ __typename: "Post", id: postId }),
        fields: {
          commentsCount: (prev) => prev + 1,
        },
      });
    },
  });

  return { addComment };
};
