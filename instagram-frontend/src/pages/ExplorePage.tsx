import { useQuery } from "@apollo/client/react";
import { GET_EXPLORE_POSTS } from "../graphql/queries/post";
import type { ExploreData } from "../types/post";
import { PostItem } from "../components/profile/PostItem";

const ExplorePage = () => {
  const { data, loading, error } = useQuery<ExploreData>(GET_EXPLORE_POSTS);

  if (loading) {
    return (
      <div className="flex w-full justify-center pt-20 text-white">
        Loading posts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full justify-center pt-20 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-5xl pt-4 md:p-8">
      <div className="grid grid-cols-3 gap-0.5">
        {data?.getExplorePosts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
