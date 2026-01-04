import { Stories } from "../components/Stories";
import { Post } from "../components/Post";
import { GET_FEED } from "../graphql/queries/post";
import { useQuery } from "@apollo/client/react";
import type { FeedData } from "../types/post";

const Home = () => {
  const { loading, error, data } = useQuery<FeedData>(GET_FEED);

  if (loading) {
    return (
      <div className="flex w-full justify-center pt-20 text-white">
        Loading feed...
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
      <div className="w-full lg:w-[630px] flex flex-col gap-2 pt-4">
        <Stories />

        <div className="mt-4">
          {data?.getFeed.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Right Sidebar - Suggestions (Desktop Only) */}
      <div className="hidden lg:block w-[320px] pl-16 pt-10">
        {/* Current User */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/150?img=3"
              className="w-12 h-12 rounded-full"
            />
            <div className="text-sm">
              <div className="font-semibold">my_account</div>
              <div className="text-gray-500">My Name</div>
            </div>
          </div>
          <button className="text-xs font-semibold text-blue-400 hover:text-white">
            Switch
          </button>
        </div>

        <div className="flex justify-between mb-4">
          <span className="text-sm font-semibold text-gray-500">
            Suggested for you
          </span>
          <span className="text-xs font-semibold text-white cursor-pointer">
            See All
          </span>
        </div>

        {/* Suggestion List */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <img
                src={`https://i.pravatar.cc/150?img=${i + 40}`}
                className="w-8 h-8 rounded-full"
              />
              <div className="text-xs">
                <div className="font-semibold hover:underline cursor-pointer">
                  user_suggest_{i}
                </div>
                <div className="text-gray-500">Followed by friend_x</div>
              </div>
            </div>
            <button className="text-xs font-semibold text-blue-400 hover:text-white">
              Follow
            </button>
          </div>
        ))}

        {/* Footer Links */}
        <div className="mt-8 text-xs text-gray-500 space-y-4">
          <p>About · Help · Press · API · Jobs · Privacy · Terms</p>
          <p>© 2023 INSTAGRAM FROM META</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
