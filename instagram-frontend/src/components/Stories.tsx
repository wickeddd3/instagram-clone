export const Stories = () => {
  const stories = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    username: `user_${i}`,
    avatar: `https://i.pravatar.cc/150?img=${i + 10}`,
  }));

  return (
    <div className="flex gap-4 overflow-x-auto max-w-[630px] mx-auto py-4 scrollbar-hide">
      {stories.map((story) => (
        <div
          key={story.id}
          className="flex flex-col items-center gap-1 min-w-[66px]"
        >
          {/* Gradient Ring */}
          <div className="w-[66px] h-[66px] rounded-full bg-linear-to-tr from-yellow-400 to-fuchsia-600 p-0.5">
            <div className="bg-black p-0.5 rounded-full w-full h-full">
              <img
                src={story.avatar}
                alt={story.username}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
          <span className="text-xs text-gray-200 truncate w-16 text-center">
            {story.username}
          </span>
        </div>
      ))}
    </div>
  );
};
