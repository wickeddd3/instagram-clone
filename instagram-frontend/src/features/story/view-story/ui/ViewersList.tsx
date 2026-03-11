import { useEffect } from "react";
import { motion } from "framer-motion";
import { useStoryViewers } from "../model/useStoryViewers";
import { NoViewers, ViewerLink } from "@/entities/story";
import { useModalActions } from "@/app/providers/ModalContext";
import { useAuth } from "@/app/providers/AuthContext";
import { Spinner } from "@/shared/ui/Spinner";

export const ViewersList = ({
  storyId,
  onClose,
}: {
  storyId: string;
  onClose: () => void;
}) => {
  const { closeModal } = useModalActions();
  const { getStoryViewers, viewers, loading } = useStoryViewers();
  const { authUser } = useAuth();

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
      <div className="h-2/5 flex flex-col bg-neutral-900 rounded-t-2xl">
        <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-700">
          <h3 className="font-bold">Viewers</h3>
          <button
            onClick={onClose}
            className="text-indigo-500 font-bold cursor-pointer"
          >
            Done
          </button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-2">
          {viewers.length === 0 && (
            <div className="w-full h-full flex justify-center items-center">
              {loading ? <Spinner /> : <NoViewers />}
            </div>
          )}
          {viewers.length > 0 &&
            viewers.map((view) => (
              <ViewerLink
                key={view.id}
                viewer={view.viewer}
                onClick={() => {
                  onClose();
                  closeModal();
                }}
                isAuthor={view.viewer.id === authUser?.id}
              />
            ))}
        </div>
      </div>
    </motion.div>
  );
};
