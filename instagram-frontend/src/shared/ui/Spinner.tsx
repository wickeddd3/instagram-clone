import { Loader } from "lucide-react";

export const Spinner = ({
  size = 34,
  className = "",
}: {
  size?: number;
  className?: string;
}) => {
  return (
    <Loader
      className={`animate-spin text-gray-400 ${className}`}
      size={size}
      role="status"
      aria-label="Loading"
    />
  );
};
