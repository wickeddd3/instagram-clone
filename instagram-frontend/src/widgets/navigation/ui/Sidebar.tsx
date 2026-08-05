import {
  Home,
  Search,
  Compass,
  Heart,
  Plus,
  Menu,
  Instagram,
  Send,
  Sun,
  Moon,
  Monitor,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/entities/profile";
import { useTheme, type Theme } from "@/shared/lib";

interface SidebarProps {
  isSidebarOpen?: boolean;
  onSidebarHover?: (isOpen: boolean) => void;
  onCreatePost: () => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
}

const THEME_OPTIONS: { value: Theme; label: string; Icon: typeof Sun }[] = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
];

export const Sidebar = ({
  isSidebarOpen,
  onSidebarHover,
  onCreatePost,
  onOpenSearch,
  onOpenNotifications,
}: SidebarProps) => {
  const { authProfile } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const [isMoreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Close the "More" menu on outside click or Escape.
  useEffect(() => {
    if (!isMoreOpen) return;
    const handlePointer = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isMoreOpen]);

  if (!authProfile) return null;

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
      action: onOpenSearch,
    },
    {
      icon: <Compass size={iconSize} />,
      label: "Explore",
      action: () => navigate("/explore"),
    },
    {
      icon: <Heart size={iconSize} />,
      label: "Notifications",
      action: onOpenNotifications,
    },
    {
      icon: <Plus size={iconSize} />,
      label: "Create",
      action: onCreatePost,
    },
    {
      icon: (
        <div className="w-6 h-6 rounded-full bg-surface-hover overflow-hidden">
          <img
            src={authProfile?.avatarUrl || "/ig-default.jpg"}
            alt={`${authProfile?.username}'s profile`}
          />
        </div>
      ),
      label: "Profile",
      action: () => navigate(`/${authProfile?.username}`),
    },
  ];

  return (
    <div
      className="h-full flex flex-col justify-between px-2 py-5"
      onMouseEnter={() => onSidebarHover && onSidebarHover(true)}
      onMouseLeave={() => onSidebarHover && onSidebarHover(false)}
    >
      {/* Logo */}
      <button
        onClick={() => navigate("/")}
        aria-label="Instagram home"
        title="Instagram home"
        className="flex items-center py-2 px-2.5 w-full cursor-pointer"
      >
        <Instagram className="block w-6 h-6" aria-hidden="true" />
      </button>

      {/* Nav Items */}
      <nav aria-label="Primary">
        {navItems.map((item, index) => (
          <button
            key={index}
            aria-label={item.label}
            title={item.label}
            className="flex items-center gap-4 py-3 px-2.5 hover:bg-foreground/10 rounded-lg w-full transition-colors duration-200 group cursor-pointer"
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

      {/* More Options — opens the "Switch appearance" menu */}
      <div className="relative" ref={moreRef}>
        <AnimatePresence>
          {isMoreOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.15 }}
              role="menu"
              aria-label="Switch appearance"
              className="absolute bottom-full left-0 mb-2 w-60 overflow-hidden rounded-xl border border-border bg-surface shadow-xl"
            >
              <p className="px-4 pt-3 pb-2 text-sm font-semibold">
                Switch appearance
              </p>
              {THEME_OPTIONS.map(({ value, label, Icon }) => {
                const active = theme === value;
                return (
                  <button
                    key={value}
                    type="button"
                    role="menuitemradio"
                    aria-checked={active}
                    onClick={() => setTheme(value)}
                    className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-sm hover:bg-foreground/10 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={18} aria-hidden="true" />
                      {label}
                    </span>
                    {active && (
                      <Check
                        size={16}
                        className="text-primary"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          aria-label="More"
          aria-haspopup="menu"
          aria-expanded={isMoreOpen}
          title="More"
          onClick={() => setMoreOpen((open) => !open)}
          className="flex items-center gap-4 py-2 px-2.5 hover:bg-foreground/10 rounded-lg w-full transition-colors duration-200 group cursor-pointer"
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Menu size={iconSize} aria-hidden="true" />
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
    </div>
  );
};
