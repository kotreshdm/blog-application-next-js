import { formatDistanceToNow } from "date-fns";

export const DateFormt = (date: string) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};
