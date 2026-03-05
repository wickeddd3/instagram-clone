import { motion, useScroll, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Spinner } from "./Spinner";

interface Props {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}

export const PullToRefresh = ({ onRefresh, children }: Props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { scrollY } = useScroll();
  const y = useMotionValue(0);

  // Only allow pulling down if we are at the very top of the page
  const [canPull, setCanPull] = useState(true);
  useEffect(() => {
    return scrollY.onChange((latest) => setCanPull(latest <= 0));
  }, [scrollY]);

  const handleDragEnd = async () => {
    // Check if we pulled far enough (80px)
    if (y.get() > 20 && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh(); // Now this will actually wait for 2 seconds
      } finally {
        setIsRefreshing(false);
        // Pushes the UI back to the top
        y.set(0); // Snap back
      }
    } else {
      // If we didn't pull far enough, just snap back immediately
      y.set(0); // Snap back
    }
  };

  const opacity = useTransform(y, [0, 80], [0.5, 1]);
  const scale = useTransform(y, [0, 80], [0.5, 1]);

  return (
    <div className="relative overflow-hidden">
      {/* Indicator */}
      <motion.div
        style={{ y, opacity, scale }}
        className="absolute top-4 left-0 right-0 flex justify-center z-50 pointer-events-none"
      >
        <div className="bg-zinc-800 p-2 rounded-full shadow-lg border border-zinc-700">
          {isRefreshing ? <Spinner /> : <span className="text-xs">↓</span>}
        </div>
      </motion.div>

      <motion.div
        drag={canPull ? "y" : false}
        dragConstraints={{ top: 0, bottom: 20 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{ y }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </div>
  );
};
