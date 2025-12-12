import {
  Home,
  Search,
  Compass,
  Heart,
  Plus,
  MessageCircle,
  Menu,
  Instagram,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  onCreateClick?: () => void;
}

export const Sidebar = ({ onCreateClick }: SidebarProps) => {
  const navigate = useNavigate();

  const navItems = [
    { icon: <Home size={24} />, label: "Home", action: () => navigate("/") },
    {
      icon: <Search size={24} />,
      label: "Search",
      action: () => navigate("/search"),
    },
    {
      icon: <Compass size={24} />,
      label: "Explore",
      action: () => navigate("/explore"),
    },
    {
      icon: <MessageCircle size={24} />,
      label: "Messages",
      action: () => navigate("/messages"),
    },
    {
      icon: <Heart size={24} />,
      label: "Notifications",
      action: () => navigate("/notifications"),
    },
    {
      icon: <Plus size={24} />,
      label: "Create",
      action: onCreateClick,
    },
    {
      icon: (
        <div className="w-6 h-6 rounded-full bg-gray-500 overflow-hidden">
          <img src="https://i.pravatar.cc/150?img=3" alt="Profile" />
        </div>
      ),
      label: "Profile",
      action: () => navigate("/profile"),
    },
  ];

  return (
    <div className="h-full flex flex-col justify-between px-3 py-5">
      <div>
        {/* Logo */}
        <div className="mb-8 px-3 pt-2">
          {/* Large Screen Logo */}
          <h1
            className="hidden lg:block text-2xl font-medium"
            style={{ fontFamily: "Grand Hotel, cursive" }}
          >
            Instagram
          </h1>
          {/* Tablet Logo (Icon) */}
          <Instagram className="block lg:hidden w-6 h-6" />
        </div>

        {/* Nav Items */}
        <nav className="space-y-2">
          {navItems.map((item, index) => (
            <button
              key={index}
              className="flex items-center gap-4 p-3 hover:bg-white/10 rounded-lg w-full transition-colors duration-200 group cursor-pointer"
              onClick={item.action}
            >
              <div className="group-hover:scale-105 transition-transform">
                {item.icon}
              </div>
              <span className="hidden lg:block text-[16px]">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* More Options */}
      <button className="flex items-center gap-4 p-3 hover:bg-white/10 rounded-lg w-full text-left">
        <Menu size={24} />
        <span className="hidden lg:block text-[16px]">More</span>
      </button>
    </div>
  );
};
