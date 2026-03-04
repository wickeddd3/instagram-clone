import { Sidebar } from "@/widgets/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

export const LayoutSidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <motion.aside
      initial={false}
      animate={{ width: isSidebarOpen ? 245 : 60 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="hidden md:flex flex-col h-screen fixed top-0 z-50 bg-[#0d1015]"
    >
      <Sidebar isSidebarOpen={isSidebarOpen} onSidebarHover={setSidebarOpen} />
    </motion.aside>
  );
};
