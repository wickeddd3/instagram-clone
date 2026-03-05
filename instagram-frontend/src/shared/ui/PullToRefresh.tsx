import {
  motion,
  useScroll,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useState, useEffect } from "react";
import { Spinner } from "./Spinner";

interface Props {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}

export const PullToRefresh = ({ onRefresh, children }: Props) => {
  const { scrollY } = useScroll();
  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 400, damping: 40 });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    return scrollY.onChange((latest) => setAtTop(latest <= 0));
  }, [scrollY]);

  const handleDragEnd = async () => {
    const currentY = y.get();
    if (currentY > 40 && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
    y.set(0);
  };

  return (
    <div className="relative w-full">
      {/* 1. THE SPINNER - Now animated properly */}
      <motion.div
        style={{
          y: springY,
          opacity: useTransform(y, [0, 50], [0, 1]),
          scale: useTransform(y, [0, 10], [0.5, 1]),
        }}
        className="fixed top-24 left-0 right-0 flex justify-center z-100 pointer-events-none"
      >
        <div className="bg-zinc-800 p-2 rounded-full shadow-xl border border-zinc-700">
          <Spinner className={isRefreshing ? "animate-spin" : ""} />
        </div>
      </motion.div>

      {/* 2. THE TRIGGER - An invisible bar at the top that only exists when at scroll 0 */}
      {atTop && (
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 100 }}
          dragElastic={0.4}
          onDrag={(_, info) => y.set(info.offset.y)}
          onDragEnd={handleDragEnd}
          className="absolute top-0 left-0 right-0 h-40 z-90 bg-transparent"
        />
      )}

      {/* 3. THE CONTENT - No drag props here, so scrolling works perfectly */}
      <div className="w-full">{children}</div>
    </div>
  );
};
