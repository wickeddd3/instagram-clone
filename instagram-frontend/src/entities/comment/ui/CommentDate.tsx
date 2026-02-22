import { formatDistanceToNow } from "date-fns";

export const CommentDate = ({ date }: { date: string }) => {
  return (
    <span className="font-light">{formatDistanceToNow(new Date(date))}</span>
  );
};
