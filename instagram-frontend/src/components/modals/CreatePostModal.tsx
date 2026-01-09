import { useState } from "react";
import { X, Image as ImageIcon, ArrowLeft, Loader2 } from "lucide-react";
import { useMutation } from "@apollo/client/react";
import { CREATE_POST } from "../../graphql/mutations/post";
import { GET_FEED } from "../../graphql/queries/post";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { createUploadPath } from "../../utils/upload";
import { useSupabaseUpload } from "../../hooks/useSupabaseUpload";
import { usePreviewUpload } from "../../hooks/usePreviewUpload";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePostModal = ({ isOpen, onClose }: CreatePostModalProps) => {
  const { user, authUser } = useAuth();

  const { uploadImage } = useSupabaseUpload();
  const {
    previewUrl,
    fileToUpload,
    isUploading,
    setIsUploading,
    handleFileChange,
  } = usePreviewUpload();

  const [step, setStep] = useState<"upload" | "details">("upload");
  const [caption, setCaption] = useState("");

  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_FEED }],
    onCompleted: () => {
      resetState();
      onClose();
    },
  });

  const resetState = () => {
    setStep("upload");
    setCaption("");
    setIsUploading(false);
  };

  if (!isOpen) return null;

  if (!user) return null;

  const CURRENT_USER_ID = user.id;

  // Handle Sharing Post + Uploading Image
  const handleShare = async () => {
    if (!fileToUpload) return;

    setIsUploading(true);

    try {
      // Create unique file path
      const filePath = createUploadPath(CURRENT_USER_ID, fileToUpload);

      // Get Public URL after upload
      const publicUrl = await uploadImage(fileToUpload, filePath, "posts");

      // Create Post
      await createPost({
        variables: {
          imageUrl: publicUrl,
          caption: caption,
        },
      });
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Check console for details.");
      setIsUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-60"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
      >
        <X size={32} />
      </button>
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="bg-neutral-900 rounded-xl w-full max-w-1/2 h-full max-h-1/2 flex flex-col md:flex-row overflow-hidden"
      >
        {step === "upload" && (
          <div className="w-full h-full flex flex-col items-center justify-center text-white">
            <div className="border-b border-neutral-800 w-full text-center py-3 font-semibold">
              Create new post
            </div>
            <div className="flex flex-col items-center justify-center flex-1 gap-4">
              <ImageIcon size={64} strokeWidth={1} />
              <p className="text-xl font-light">Drag photos and videos here</p>
              <label className="bg-indigo-800 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-md text-sm font-semibold cursor-pointer transition">
                Select from computer
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    handleFileChange(e, () => setStep("details"))
                  }
                  accept="image/*"
                />
              </label>
            </div>
          </div>
        )}

        {step === "details" && previewUrl && (
          <>
            <div className="w-full md:w-[60%] h-[400px] md:h-full bg-black flex items-center justify-center relative border-r border-gray-700">
              <button
                onClick={() => setStep("upload")}
                className="absolute top-4 left-4 p-2 bg-black/50 rounded-full hover:bg-black/70 text-white z-10 cursor-pointer"
              >
                <ArrowLeft size={20} />
              </button>
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full md:w-[40%] flex flex-col bg-neutral-900">
              <div className="border-b border-neutral-800 p-3 flex justify-between items-center">
                <span className="text-transparent">Back</span>
                <span className="text-white font-semibold">Compose</span>

                {/* SHARE BUTTON */}
                <button
                  onClick={handleShare}
                  disabled={isUploading}
                  className="text-[#0095f6] font-bold text-sm hover:text-white transition disabled:opacity-50"
                >
                  {isUploading ? "Sharing..." : "Share"}
                </button>
              </div>

              {isUploading && (
                <div className="w-full bg-blue-500/20 text-blue-200 text-xs p-2 text-center flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={14} /> Uploading to
                  server...
                </div>
              )}

              <div className="p-4 flex gap-3">
                <img
                  src={authUser?.getProfileById?.avatarUrl || "/ig-default.jpg"}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-white font-semibold text-sm">
                  {authUser?.getProfileById?.username}
                </span>
              </div>

              <textarea
                className="bg-transparent text-white w-full h-[200px] p-4 resize-none focus:outline-none placeholder-gray-500"
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                disabled={isUploading}
              />

              {/* Metadata Options */}
              <div className="mt-auto p-4 border-t border-neutral-800 text-gray-400 text-sm flex justify-between items-center cursor-pointer hover:bg-white/5">
                <span>Add Location</span>
                <span>📍</span>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};
