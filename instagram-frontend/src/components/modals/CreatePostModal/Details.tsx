import { ArrowLeft, Loader2 } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import { useSupabaseUpload } from "../../../hooks/useSupabaseUpload";
import { createUploadPath } from "../../../utils/upload";
import { useMutation } from "@apollo/client/react";
import { CREATE_POST } from "../../../graphql/mutations/post";
import { useState } from "react";
import type { CreatedPost } from "../../../types/post";

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

  const [createPost] = useMutation<CreatedPost>(CREATE_POST, {
    // Manually update the cache
    update(cache, { data }) {
      const newPost = data?.createPost;
      if (!newPost) return;

      cache.modify({
        fields: {
          getFeedPosts(existingFeedData) {
            return {
              ...existingFeedData,
              posts: [newPost, ...existingFeedData.posts],
            };
          },
        },
      });
    },
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
    <div className="w-full h-full flex flex-col items-center justify-center text-white">
      <div className="bg-neutral-950 border-b border-neutral-800 w-full flex items-center justify-between">
        <button
          onClick={() => setStep("upload")}
          className="rounded-full text-white cursor-pointer pl-4"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-center py-3 font-semibold">Create new post</h1>
        {/* SHARE BUTTON */}
        <button
          onClick={handleShare}
          disabled={isUploading}
          className="text-indigo-400 font-semibold text-sm hover:text-indigo-300 hover:underline transition disabled:opacity-50 pr-4 cursor-pointer"
        >
          {isUploading ? "Sharing..." : "Share"}
        </button>
      </div>

      <div className="flex-1 h-[400px] w-full flex flex-col md:flex-row">
        {/* Preview Image */}
        <div className="w-full md:w-[60%] h-1/2 md:h-full bg-black flex items-center justify-center relative border-r border-gray-700">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Details */}
        <div className="w-full h-full md:w-[40%] flex flex-col bg-neutral-900">
          {isUploading && (
            <div className="w-full bg-indigo-500/20 text-indigo-200 text-xs p-2 text-center flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" size={14} /> Uploading...
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

          {/* TODO: Metadata Options */}
        </div>
      </div>
    </div>
  );
};
