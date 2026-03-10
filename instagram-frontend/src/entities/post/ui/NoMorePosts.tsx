import { motion } from "framer-motion";

export const NoMorePosts = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full flex justify-center items-center"
    >
      <p className="text-gray-500 text-xs text-center">No more posts to show</p>
    </motion.div>
  );
};
