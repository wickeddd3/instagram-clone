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
      <div className="hidden lg:block w-[320px] pl-16 pt-10"></div>
    </div>
  );
};

export default Home;
