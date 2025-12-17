import { useState } from "react";
import { MobileNav } from "./MobileNav";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import { CreatePostModal } from "../CreatePostModal";
import { MobileHeader } from "./MobileHeader";

export const Layout = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-full h-full flex flex-col md:flex-row min-h-screen bg-black text-white">
      {/* Top Header - Hidden on Desktop */}
      <div className="md:hidden fixed top-0 w-full z-50 bg-black border-t border-gray-800">
        <MobileHeader />
      </div>

      {/* Left Sidebar - Hidden on Mobile */}
      <aside
        className={`hidden md:flex w-[60px] flex-col h-screen fixed bg-black top-0 z-50 ${
          isSidebarOpen ? "w-[245px]" : "w-[60px]"
        }`}
      >
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          onSidebarHover={setSidebarOpen}
          onCreateClick={() => setModalOpen(true)}
        />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex justify-center w-full md:mt-0 mt-14 ">
        <Outlet />
      </main>

      {/* Bottom Nav - Hidden on Desktop */}
      <div className="md:hidden fixed bottom-0 w-full z-50 bg-black border-t border-gray-800">
        <MobileNav />
      </div>

      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};
