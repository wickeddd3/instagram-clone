import {
  Home,
  Search,
  Compass,
  Heart,
  Plus,
  Menu,
  Instagram,
  Send,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";

interface SidebarProps {
  isSidebarOpen?: boolean;
  onSidebarHover?: (isOpen: boolean) => void;
  onCreateClick?: () => void;
  onSearchClick?: () => void;
  onNotificationClick?: () => void;
}

export const Sidebar = ({
  isSidebarOpen,
  onSidebarHover,
  onCreateClick,
  onSearchClick,
  onNotificationClick,
}: SidebarProps) => {
  const { authUser } = useAuth();

  if (!authUser?.getProfileById) return null;

  const navigate = useNavigate();

  const iconSize = 24;

  const navItems = [
    {
      icon: <Home size={iconSize} />,
      label: "Home",
      action: () => navigate("/"),
    },
    {
      icon: <Send size={iconSize} />,
      label: "Messages",
      action: () => navigate("/inbox"),
    },
    {
      icon: <Search size={iconSize} />,
      label: "Search",
      action: onSearchClick,
    },
    {
      icon: <Compass size={iconSize} />,
      label: "Explore",
      action: () => navigate("/explore"),
    },
    {
      icon: <Heart size={iconSize} />,
      label: "Notifications",
      action: onNotificationClick,
    },
    {
      icon: <Plus size={iconSize} />,
      label: "Create",
      action: onCreateClick,
    },
    {
      icon: (
        <div className="w-6 h-6 rounded-full bg-gray-500 overflow-hidden">
          <img
            src={authUser?.getProfileById?.avatarUrl || "/ig-default.jpg"}
            alt="Profile"
          />
        </div>
      ),
      label: "Profile",
      action: () => navigate(`/${authUser?.getProfileById.username}`),
    },
  ];

  return (
    <div
      className="h-full flex flex-col justify-between px-2 py-5"
      onMouseEnter={() => onSidebarHover && onSidebarHover(true)}
      onMouseLeave={() => onSidebarHover && onSidebarHover(false)}
    >
      {/* Logo */}
      <button className="flex items-center py-2 px-2.5 w-full cursor-pointer">
        <Instagram className="block w-6 h-6" />
      </button>

      {/* Nav Items */}
      <nav>
        {navItems.map((item, index) => (
          <button
            key={index}
            className="flex items-center gap-4 py-3 px-2.5 hover:bg-white/10 rounded-lg w-full transition-colors duration-200 group cursor-pointer"
            onClick={item.action}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              {item.icon}
            </motion.div>
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-md whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}
      </nav>

      {/* More Options */}
      <button className="flex items-center gap-4 py-2 px-2.5 hover:bg-white/10 rounded-lg w-full transition-colors duration-200 group cursor-pointer">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Menu size={iconSize} />
        </motion.div>
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="text-md whitespace-nowrap"
            >
              More
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};
