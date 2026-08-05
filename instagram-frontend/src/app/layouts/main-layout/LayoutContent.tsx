import { motion } from "framer-motion";
import { Outlet, useLocation, useNavigation } from "react-router-dom";

export const LayoutContent = () => {
  const location = useLocation();
  const navigation = useNavigation();
  const isNavigating = navigation.state === "loading";

  return (
    <main
      id="main-content"
      className="flex-1 flex justify-center w-full md:mt-0 mt-14"
    >
      {/* Route-transition progress bar — shown while a lazy page chunk loads */}
      {isNavigating && (
        <div
          role="status"
          aria-label="Loading page"
          className="fixed top-0 left-0 right-0 z-100 h-0.5 overflow-hidden bg-white/10"
        >
          <div className="loading-bar h-full w-1/3 bg-white/80" />
        </div>
      )}

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
