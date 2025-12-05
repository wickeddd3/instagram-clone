import { Stories } from "../components/Stories";
import { Post } from "../components/Post";

const Home = () => {
  const posts = [
    {
      id: 1,
      username: "joshua_dev",
      avatar: "https://i.pravatar.cc/150?img=12",
      imageUrl:
        "https://images.unsplash.com/photo-1504194921103-f8b80cadd5e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      likes: 1240,
      caption: "Coding late into the night 🌙 #developer #react",
      timeAgo: "2h",
    },
    {
      id: 2,
      username: "design_daily",
      avatar: "https://i.pravatar.cc/150?img=32",
      imageUrl:
        "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      likes: 856,
      caption: "Minimalist workspace setup. Thoughts? 🖥️",
      timeAgo: "5h",
    },
  ];

  return (
    <div className="flex w-full max-w-5xl">
      {/* Central Feed Column */}
      <div className="w-full lg:w-[630px] flex flex-col gap-2 pt-4">
        <Stories />

        <div className="mt-4">
          {posts.map((post) => (
            <Post
              key={post.id}
              username={post.username}
              avatar={post.avatar}
              imageUrl={post.imageUrl}
              likes={post.likes}
              caption={post.caption}
              timeAgo={post.timeAgo}
            />
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
