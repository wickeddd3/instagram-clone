import { Compass, Home, Plus, Send, SquarePlay } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface MobileNavProps {
  onCreateClick?: () => void;
}

export const MobileNav = ({ onCreateClick }: MobileNavProps) => {
  const { authUser } = useAuth();
  const navigate = useNavigate();

  const handleRedirectToHome = () => {
    navigate("/");
  };

  const handleRedirectToProfile = () => {
    navigate(`/${authUser?.getProfileById.username}`);
  };

  return (
    <nav className="flex justify-around p-3">
      <button
        onClick={handleRedirectToHome}
        aria-label="Home"
        title="Home"
        className="text-white cursor-pointer"
      >
        <Home size={24} />
      </button>
      <button
        aria-label="Explore"
        title="Explore"
        className="text-white cursor-pointer"
      >
        <Compass size={24} />
      </button>
      <button
        aria-label="Reels"
        title="Reels"
        className="text-white cursor-pointer"
      >
        <SquarePlay size={24} />
      </button>
      <button
        onClick={onCreateClick}
        aria-label="New Post"
        title="New Post"
        className="text-white cursor-pointer"
      >
        <Plus size={24} />
      </button>
      <button
        aria-label="Messages"
        title="Messages"
        className="text-white cursor-pointer"
      >
        <Send size={24} />
      </button>
      <button
        onClick={handleRedirectToProfile}
        aria-label="Profile"
        title="Profile"
        className="text-white cursor-pointer"
      >
        <div className="w-6 h-6 rounded-full bg-gray-500 overflow-hidden">
          <img
            src={authUser?.getProfileById.avatarUrl || "/ig-default.jpg"}
            alt="Profile"
          />
        </div>
      </button>
    </nav>
  );
};
