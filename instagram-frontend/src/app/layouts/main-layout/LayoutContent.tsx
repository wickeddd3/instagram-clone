import { motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

export const LayoutContent = () => {
  const location = useLocation();

  return (
    <main className="flex-1 flex justify-center w-full md:mt-0 mt-14">
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
  );
};
