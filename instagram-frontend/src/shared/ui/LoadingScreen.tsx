import { motion, useReducedMotion } from "framer-motion";

export const LoadingScreen = () => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      role="status"
      aria-label="Loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#0d1015]"
    >
      <div className="flex flex-col items-center gap-8">
        {/* Instagram Logo — soft pulsing glow */}
        <motion.div
          className="w-20 h-20"
          animate={
            reduceMotion
              ? undefined
              : { scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85] }
          }
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src="/ig-logo.png" alt="" className="w-full h-full" />
        </motion.div>

        {/* Indeterminate progress bar */}
        <div className="h-0.5 w-32 overflow-hidden rounded-full bg-white/10">
          <div className="loading-bar h-full w-1/3 rounded-full bg-white/70" />
        </div>
      </div>

      {/* Meta Logo */}
      <div className="absolute bottom-10 flex flex-col items-center gap-1">
        <span className="text-gray-400 text-sm tracking-widest">from</span>
        <img src="/meta-logo.png" width="120" height={30} alt="Meta" />
      </div>
    </motion.div>
  );
};
