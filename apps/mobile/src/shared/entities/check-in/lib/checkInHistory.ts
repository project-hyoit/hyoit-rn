import type { CheckInItem } from "../model/types";

export type CheckInHistoryFilter =
  | "ALL"
  | "RECEIVED"
  | "SENT"
  | "COMPLETED";

export const filterCheckInHistory = (
  items: CheckInItem[],
  filter: CheckInHistoryFilter
) => {
  if (filter === "ALL") return items;
  if (filter === "RECEIVED" || filter === "SENT") {
    return items.filter((item) => item.direction === filter);
  }

  return items.filter(
    (item) => item.status === "CHECKED" || item.status === "CONFIRMED"
  );
};
const isSameCalendarDay = (date: Date, target: Date) =>
  date.getFullYear() === target.getFullYear() &&
  date.getMonth() === target.getMonth() &&
  date.getDate() === target.getDate();

export const groupCheckInHistoryByDate = (
  items: CheckInItem[],
  now = new Date()
) => {
  const sorted = [...items].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return {
    today: sorted.filter((item) => isSameCalendarDay(new Date(item.createdAt), now)),
    past: sorted.filter((item) => !isSameCalendarDay(new Date(item.createdAt), now)),
  };
};
