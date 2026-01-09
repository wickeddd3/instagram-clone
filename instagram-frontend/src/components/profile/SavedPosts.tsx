import { useQuery } from "@apollo/client/react";
import type { SavedPostsData } from "../../types/post";
import { GET_SAVED_POSTS } from "../../graphql/queries/post";
import { PostItem } from "./PostItem";

export const SavedPosts = () => {
  const { loading, error, data } = useQuery<SavedPostsData>(GET_SAVED_POSTS);

  return (
    <>
      {loading && (
        <div className="flex w-full justify-center pt-20 text-white">
          Loading posts...
        </div>
      )}

      {error && (
        <div className="flex w-full justify-center pt-20 text-red-500">
          Error: {error.message}
        </div>
      )}

      <div className="grid grid-cols-3 gap-0.5">
        {data?.getSavedPosts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};
