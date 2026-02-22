import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { MobileHeader, MobileNav, Sidebar } from "@/widgets/navigation";
import { useModal } from "@/app/providers/ModalContext";
import { useDrawer } from "@/app/providers/DrawerContext";
import { Modal } from "@/shared/ui/Modal";
import { Drawer } from "@/shared/ui/Drawer";

export const MainLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();

  const { isModalOpen, modalContent, hasModalCloseButton, closeModal } =
    useModal();

  const { isDrawerOpen, drawerContent, hasDrawerCloseButton, closeDrawer } =
    useDrawer();

  return (
    <div className="w-full h-full flex flex-col md:flex-row min-h-screen bg-[#0d1015] text-white">
      {/* Top Header - Hidden on Desktop */}
      <div className="md:hidden fixed top-0 w-full z-50 bg-[#0d1015]">
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
        />
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex justify-center w-full md:mt-0 mt-14 ">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full flex justify-center"
        >
          <Outlet />
        </motion.div>
      </main>

      {/* Bottom Nav - Hidden on Desktop */}
      <div className="md:hidden fixed bottom-0 w-full z-50 bg-[#0d1015] border-t border-gray-800">
        <MobileNav />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          content={modalContent}
          onClose={closeModal}
          hasCloseButton={hasModalCloseButton}
        />
      )}

      {/* Drawer */}
      {isDrawerOpen && (
        <Drawer
          content={drawerContent}
          hasCloseButton={hasDrawerCloseButton}
          onClose={closeDrawer}
        />
      )}
    </div>
  );
};
