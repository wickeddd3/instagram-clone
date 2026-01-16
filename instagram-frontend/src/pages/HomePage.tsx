import { Stories } from "../components/Stories";
import { Post } from "../components/posts/Post";
import { GET_FEED } from "../graphql/queries/post";
import { useQuery } from "@apollo/client/react";
import type { FeedData } from "../types/post";
import { AuthUser } from "../components/AuthUser";
import { SuggestionsSidebar } from "../components/layouts/SuggestionsSidebar";
import { PostSkeleton } from "../components/loaders/PostSkeleton";

const HomePage = () => {
  const { loading, error, data } = useQuery<FeedData>(GET_FEED);

  if (loading) {
    return (
      <div className="w-full flex flex-col gap-8">
        {[...Array(8)].map((_, i) => (
          <PostSkeleton key={i} />
        ))}
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
    <div className="flex w-full max-w-5xl">
      {/* Central Feed Column */}
      <div className="w-full lg:w-[630px] flex flex-col gap-4 pt-4">
        <Stories />

        <div className="flex flex-col gap-6">
          {data?.getFeed.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Right Sidebar - Suggestions (Desktop Only) */}
      <div className="hidden w-[320px] pl-16 pt-10 lg:flex flex-col gap-6">
        {/* Current User */}
        <AuthUser />

        {/* Suggestion List */}
        <SuggestionsSidebar />

        {/* Footer Links */}
        <div className="mt-8 text-xs text-gray-500 space-y-4">
          <p>About · Help · Press · API · Jobs · Privacy · Terms</p>
          <p>© 2023 INSTAGRAM FROM META</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
