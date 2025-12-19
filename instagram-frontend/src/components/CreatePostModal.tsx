import React, { useState } from "react";
import { X, Image as ImageIcon, ArrowLeft, Loader2 } from "lucide-react";
import { useMutation } from "@apollo/client/react";
import { CREATE_POST } from "../graphql/mutations/post";
import { GET_FEED } from "../graphql/queries/post";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CURRENT_USER_ID = "f962833b-5c26-4ffe-bc8e-861e9235f8a8";

export const CreatePostModal = ({ isOpen, onClose }: CreatePostModalProps) => {
  const [step, setStep] = useState<"upload" | "details">("upload");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_FEED }],
    onCompleted: () => {
      resetState();
      onClose();
    },
  });

  const resetState = () => {
    setStep("upload");
    setPreviewUrl(null);
    setFileToUpload(null);
    setCaption("");
    setIsUploading(false);
  };

  if (!isOpen) return null;

  // 1. Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileToUpload(file);

      // Create local preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setStep("details");
    }
  };

  // 2. Handle Sharing (Upload + Mutation)
  const handleShare = async () => {
    if (!fileToUpload) return;
    setIsUploading(true);

    try {
      // A. Upload Image to Supabase Storage
      const fileExt = fileToUpload.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`; // Random unique name
      const filePath = `${CURRENT_USER_ID}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("posts") // Your bucket name
        .upload(filePath, fileToUpload);

      if (uploadError) throw uploadError;

      // B. Get Public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("posts").getPublicUrl(filePath);

      // C. Save Metadata to Backend via GraphQL
      await createPost({
        variables: {
          userId: CURRENT_USER_ID,
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
        className="bg-[#262626] rounded-xl w-full max-w-1/2 h-full max-h-1/2 flex flex-col md:flex-row overflow-hidden"
      >
        {step === "upload" && (
          <div className="w-full h-full flex flex-col items-center justify-center text-white">
            <div className="border-b border-gray-700 w-full text-center py-3 font-semibold">
              Create new post
            </div>
            <div className="flex flex-col items-center justify-center flex-1 gap-4">
              <ImageIcon size={64} strokeWidth={1} />
              <p className="text-xl font-light">Drag photos and videos here</p>
              <label className="bg-[#0095f6] hover:bg-[#1877f2] text-white px-4 py-1.5 rounded-md text-sm font-semibold cursor-pointer transition">
                Select from computer
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
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
                className="absolute top-4 left-4 p-2 bg-black/50 rounded-full hover:bg-black/70 text-white z-10"
              >
                <ArrowLeft size={20} />
              </button>
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full md:w-[40%] flex flex-col bg-[#262626]">
              <div className="border-b border-gray-700 p-3 flex justify-between items-center">
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
                  src="https://i.pravatar.cc/150?img=3"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-white font-semibold text-sm">
                  my_creative_life
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
              <div className="mt-auto p-4 border-t border-gray-700 text-gray-400 text-sm flex justify-between items-center cursor-pointer hover:bg-white/5">
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
