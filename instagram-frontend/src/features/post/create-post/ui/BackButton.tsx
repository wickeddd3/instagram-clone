import { ArrowLeft } from "lucide-react";

export const BackButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="rounded-full text-white cursor-pointer pl-4"
    >
      <ArrowLeft size={24} />
    </button>
  );
};
