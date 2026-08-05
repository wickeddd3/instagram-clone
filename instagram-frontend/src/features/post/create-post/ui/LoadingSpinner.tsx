import { Loader2 } from "lucide-react";

export const LoadingSpinner = () => {
  return (
    <div className="w-full bg-primary/20 text-primary text-xs p-2 text-center flex items-center justify-center gap-2">
      <Loader2 className="animate-spin" size={14} aria-hidden="true" /> Uploading...
    </div>
  );
};
