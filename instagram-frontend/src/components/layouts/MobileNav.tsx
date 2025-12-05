export const MobileNav = () => {
  return (
    <nav className="flex justify-around p-2">
      {/* Simple mobile nav placeholders */}
      <button aria-label="Home" className="text-gray-400 hover:text-white">
        Home
      </button>
      <button aria-label="Search" className="text-gray-400 hover:text-white">
        Search
      </button>
      <button aria-label="Create" className="text-gray-400 hover:text-white">
        Create
      </button>
      <button aria-label="Profile" className="text-gray-400 hover:text-white">
        Profile
      </button>
    </nav>
  );
};
 