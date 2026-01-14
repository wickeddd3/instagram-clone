import { useState } from "react";
import { MobileNav } from "./MobileNav";
import { Sidebar } from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { CreatePostModal } from "../modals/CreatePostModal";
import { MobileHeader } from "./MobileHeader";
import { motion } from "framer-motion";
import { PostModal } from "../modals/PostModal";
import { usePost } from "../../contexts/PostContext";
import { SearchSidebar } from "./SearchSidebar";

export const Layout = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const location = useLocation();
  const { isPostModalOpen, closePostModal } = usePost();

  return (
    <div className="w-full h-full flex flex-col md:flex-row min-h-screen bg-[#0d1015] text-white">
      {/* Top Header - Hidden on Desktop */}
      <div className="md:hidden fixed top-0 w-full z-50 bg-[#0d1015] border-t border-gray-800">
        <MobileHeader />
      </div>

      {/* Left Sidebar - Hidden on Mobile */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 245 : 60 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hidden md:flex flex-col h-screen fixed top-0 z-50 bg-[#0d1015]"
      >
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          onSidebarHover={setSidebarOpen}
          onCreateClick={() => setModalOpen(true)}
          onSearchClick={() => setIsSearchOpen(!isSearchOpen)}
        />
      </motion.aside>

      <SearchSidebar
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex justify-center w-full md:mt-0 mt-14 ">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full flex justify-center"
        >
          <Outlet />
        </motion.div>
      </main>

      {/* Bottom Nav - Hidden on Desktop */}
      <div className="md:hidden fixed bottom-0 w-full z-50 bg-[#0d1015] border-t border-gray-800">
        <MobileNav onCreateClick={() => setModalOpen(true)} />
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />

      {/* Post Modal */}
      <PostModal isOpen={isPostModalOpen} onClose={closePostModal} />
    </div>
  );
};
