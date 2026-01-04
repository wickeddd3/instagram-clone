import { formatDistanceToNow } from "date-fns";

export const formatDateToNow = (dateString: string): string => {
  if (!dateString) return "";
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
};
