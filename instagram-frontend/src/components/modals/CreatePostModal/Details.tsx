import { ArrowLeft, Loader2 } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import { useSupabaseUpload } from "../../../hooks/useSupabaseUpload";
import { createUploadPath } from "../../../utils/upload";
import { useMutation } from "@apollo/client/react";
import { CREATE_POST } from "../../../graphql/mutations/post";
import { GET_FEED } from "../../../graphql/queries/post";
import { useState } from "react";

interface DetailsProps {
  previewUrl: string;
  fileToUpload: File | null;
  isUploading: boolean;
  setIsUploading: (value: boolean) => void;
  setStep: (value: "upload" | "details") => void;
  onClose: () => void;
}

export const Details = ({
  previewUrl,
  fileToUpload,
  isUploading,
  setIsUploading,
  setStep,
  onClose,
}: DetailsProps) => {
  const { user, authUser } = useAuth();

  if (!user) return null;

  const CURRENT_USER_ID = user.id;

  const { uploadImage } = useSupabaseUpload();

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
  );
};
