import { Sidebar } from "@/widgets/navigation";
import { useCreatePostModal } from "@/widgets/create-post-modal";
import { useSearchProfilesDrawer } from "@/widgets/search-profiles-drawer";
import { useNotificationsDrawer } from "@/widgets/notifications-drawer";
import { motion } from "framer-motion";
import { useState } from "react";

export const LayoutSidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { openCreatePostModal } = useCreatePostModal();
  const { openSearchProfilesDrawer } = useSearchProfilesDrawer();
  const { openNotificationsDrawer } = useNotificationsDrawer();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isSidebarOpen ? 245 : 60 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="hidden md:flex flex-col h-screen fixed top-0 z-50 bg-[#0d1015]"
    >
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        onSidebarHover={setSidebarOpen}
        onCreatePost={openCreatePostModal}
        onOpenSearch={openSearchProfilesDrawer}
        onOpenNotifications={openNotificationsDrawer}
      />
    </motion.aside>
  );
};
