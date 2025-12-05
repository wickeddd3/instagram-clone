import {
  Settings,
  Grid,
  Bookmark,
  User,
  Heart,
  MessageCircle,
} from "lucide-react";

const Profile = () => {
  // Mock data for the grid
  const posts = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    image: `https://i.pravatar.cc/150?img=${i + 10}`,
    likes: 120 + i * 10,
    comments: 20 + i,
  }));

  return (
    <div className="w-full max-w-[935px] px-5 py-8">
      {/* --- PROFILE HEADER --- */}
      <header className="flex flex-col md:flex-row items-center md:items-start md:gap-24 mb-10">
        {/* Avatar */}
        <div className="shrink-0 mb-6 md:mb-0">
          <div className="w-20 h-20 md:w-36 md:h-36 rounded-full p-0.5 bg-linear-to-tr from-gray-700 to-gray-400">
            <img
              src="https://i.pravatar.cc/300?img=3"
              alt="profile"
              className="w-full h-full rounded-full object-cover border-2 border-black"
            />
          </div>
        </div>

        {/* Profile Details */}
        <div className="flex flex-col gap-5 w-full">
          {/* Row 1: Username & Actions */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <h2 className="text-xl font-normal">my_creative_life</h2>

            <div className="flex gap-2">
              <button className="bg-white text-black px-4 py-1.5 rounded text-sm font-semibold hover:bg-gray-200 transition">
                Edit profile
              </button>
              <button className="bg-white text-black px-4 py-1.5 rounded text-sm font-semibold hover:bg-gray-200 transition">
                View Archive
              </button>
            </div>
            <Settings className="w-6 h-6 cursor-pointer" />
          </div>

          {/* Row 2: Stats (Hidden on mobile usually, but we'll keep simple) */}
          <ul className="flex justify-around md:justify-start gap-10 text-base">
            <li>
              <span className="font-bold">12</span> posts
            </li>
            <li>
              <span className="font-bold">1,240</span> followers
            </li>
            <li>
              <span className="font-bold">450</span> following
            </li>
          </ul>

          {/* Row 3: Bio */}
          <div className="text-sm">
            <div className="font-bold">John Doe</div>
            <div>📸 Photographer & Traveler</div>
            <div>📍 Currently in Tokyo</div>
            <a href="#" className="text-blue-200 font-semibold hover:underline">
              www.johndoe.com
            </a>
          </div>
        </div>
      </header>

      {/* --- STORY HIGHLIGHTS (Optional placeholder) --- */}
      <div className="flex gap-4 overflow-x-auto pb-10 scrollbar-hide">
        {/* Repeat Story circles here if needed */}
      </div>

      {/* --- TABS --- */}
      <div className="border-t border-gray-800 flex justify-center gap-12 text-xs font-semibold tracking-widest text-gray-500 mb-2">
        <button className="flex items-center gap-2 border-t border-white text-white py-4 -mt-px">
          <Grid size={12} /> POSTS
        </button>
        <button className="flex items-center gap-2 py-4 hover:text-white transition">
          <Bookmark size={12} /> SAVED
        </button>
        <button className="flex items-center gap-2 py-4 hover:text-white transition">
          {/* UserBox is a custom icon or Lucide's generic User */}
          <User size={12} /> TAGGED
        </button>
      </div>

      {/* --- IMAGE GRID --- */}
      <div className="grid grid-cols-3 gap-1 md:gap-7">
        {posts.map((post) => (
          <div
            key={post.id}
            className="relative aspect-square group cursor-pointer bg-gray-900"
          >
            <img
              src={post.image}
              alt={`Post ${post.id}`}
              className="w-full h-full object-cover"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center gap-6 text-white font-bold">
              <div className="flex items-center gap-1">
                <Heart className="fill-white" size={20} />
                {post.likes}
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="fill-white" size={20} />
                {post.comments}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
