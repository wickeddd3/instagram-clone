import { Avatar } from "@/shared/ui/Avatar";
import type { Viewer } from "../model/types";
import { Link } from "react-router-dom";

export const ViewerLink = ({
  viewer,
  onClick,
  isAuthor = false,
}: {
  viewer: Viewer;
  onClick?: () => void;
  isAuthor?: boolean;
}) => {
  return (
    <Link
      to={`/${viewer?.username}`}
      className="flex justify-between items-center gap-3 py-2"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <Avatar imageUrl={viewer?.avatarUrl} />
        <span className="text-sm font-medium">{viewer?.username}</span>
      </div>
      {isAuthor && <span className="text-xs font-medium">You</span>}
    </Link>
  );
};
