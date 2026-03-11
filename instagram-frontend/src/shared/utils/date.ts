import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";

export const formatDateToNow = (date: string): string => {
  if (!date) return "";
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const formatStoryTime = (date: string | Date): string => {
  if (!date) return "";

  const distance = formatDistanceToNowStrict(new Date(date));

  // distance returns "5 minutes", "2 hours", etc.
  // We want "5m", "2h"
  return distance
    .replace(" minutes", "m")
    .replace(" minute", "m")
    .replace(" hours", "h")
    .replace(" hour", "h")
    .replace(" seconds", "s")
    .replace(" second", "s")
    .replace(" days", "d")
    .replace(" day", "d");
};
