import { Compass, Home, Plus, Send } from "lucide-react";
import { useAuth } from "@/app/providers/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCreatePostModal } from "@/widgets/create-post-modal";

export const MobileNav = () => {
  const { authProfile } = useAuth();
  const { openCreatePostModal } = useCreatePostModal();

  if (!authProfile) return null;

  const navigate = useNavigate();

  const handleRedirectToHome = () => {
    navigate("/");
  };

  const handleRedirectExplore = () => {
    navigate("/explore");
  };

  const handleRedirectToInbox = () => {
    navigate("/inbox");
  };

  const handleRedirectToProfile = () => {
    navigate(`/${authProfile?.username}`);
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
        onClick={handleRedirectExplore}
        aria-label="Explore"
        title="Explore"
        className="text-white cursor-pointer"
      >
        <Compass size={24} />
      </button>
      <button
        onClick={openCreatePostModal}
        aria-label="New Post"
        title="New Post"
        className="text-white cursor-pointer"
      >
        <Plus size={24} />
      </button>
      <button
        onClick={handleRedirectToInbox}
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
            src={authProfile?.avatarUrl || "/ig-default.jpg"}
            alt="Profile"
          />
        </div>
      </button>
    </nav>
  );
};
