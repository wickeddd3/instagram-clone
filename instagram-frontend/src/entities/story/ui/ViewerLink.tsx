import { Avatar } from "@/shared/ui/Avatar";
import type { Viewer } from "../model/types";
import { Link } from "react-router-dom";

export const ViewerLink = ({
  viewer,
  onClick,
}: {
  viewer: Viewer;
  onClick?: () => void;
}) => {
  return (
    <Link
      to={`/${viewer?.username}`}
      className="flex items-center gap-3 py-2"
      onClick={onClick}
    >
      <Avatar imageUrl={viewer?.avatarUrl} />
      <span className="text-sm font-medium">{viewer?.username}</span>
    </Link>
  );
};
