import { Toaster } from "sonner";
import { MobileHeader } from "@/widgets/mobile-header";
import { MobileNav } from "@/widgets/navigation";
import { LayoutSidebar } from "./LayoutSidebar";
import { LayoutContent } from "./LayoutContent";
import { LayoutModal } from "./LayoutModal";
import { LayoutDrawer } from "./LayoutDrawer";

export const MainLayout = () => {
  return (
    <div className="w-full flex flex-col md:flex-row h-screen overflow-y-auto custom-scrollbar bg-[#0d1015] text-white">
      {/* Top Header - Hidden on Desktop */}
      <div className="md:hidden fixed top-0 w-full z-50 bg-[#0d1015]">
        <MobileHeader />
      </div>

      {/* Left Sidebar - Hidden on Mobile */}
      <LayoutSidebar />

      {/* Main Content Area */}
      <LayoutContent />

      {/* Bottom Nav - Hidden on Desktop */}
      <div className="md:hidden fixed bottom-0 w-full z-50 bg-[#0d1015] border-t border-gray-800">
        <MobileNav />
      </div>

      {/* Modal */}
      <LayoutModal />

      {/* Drawer */}
      <LayoutDrawer />

      {/* Snackbar */}
      <Toaster />
    </div>
  );
};
