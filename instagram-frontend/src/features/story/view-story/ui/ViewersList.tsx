import { useEffect } from "react";
import { useStoryViewers } from "../model/useStoryViewers";
import { Avatar } from "@/shared/ui/Avatar";
import { motion } from "framer-motion";

export const ViewersList = ({
  storyId,
  onClose,
}: {
  storyId: string;
  onClose: () => void;
}) => {
  const { getStoryViewers, viewers } = useStoryViewers();

  useEffect(() => {
    getStoryViewers({ variables: { storyId } });
  }, [storyId]);

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="absolute inset-0 z-100 h-full flex flex-col justify-end"
    >
      <div className="h-3/5 w-full opacity-0"></div>
      <div className="h-2/5 bg-neutral-900 rounded-t-2xl">
        <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-700">
          <h3 className="font-bold">Viewers</h3>
          <button
            onClick={onClose}
            className="text-indigo-500 font-bold cursor-pointer"
          >
            Done
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-2">
          {viewers.length === 0 ? (
            <p className="text-neutral-500 text-center mt-10">No viewers yet</p>
          ) : (
            viewers.map((view) => (
              <div key={view.id} className="flex items-center gap-3 py-2">
                <Avatar imageUrl={view?.viewer?.avatarUrl} />
                <span className="text-sm font-medium">
                  {view?.viewer?.username}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};
