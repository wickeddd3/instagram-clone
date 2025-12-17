import { Compass, Home, Plus, Send, SquarePlay } from "lucide-react";

export const MobileNav = () => {
  return (
    <nav className="flex justify-around p-3">
      {/* Simple mobile nav placeholders */}
      <button aria-label="Home" className="text-white cursor-pointer">
        <Home size={24} />
      </button>
      <button aria-label="Create" className="text-white cursor-pointer">
        <SquarePlay size={24} />
      </button>
      <button aria-label="Search" className="text-white cursor-pointer">
        <Compass size={24} />
      </button>
      <button aria-label="Create" className="text-white cursor-pointer">
        <Plus size={24} />
      </button>
      <button aria-label="Create" className="text-white cursor-pointer">
        <Send size={24} />
      </button>
      <button aria-label="Profile" className="text-white cursor-pointer">
        <div className="w-6 h-6 rounded-full bg-gray-500 overflow-hidden">
          <img src="https://i.pravatar.cc/150?img=3" alt="Profile" />
        </div>
      </button>
    </nav>
  );
};
