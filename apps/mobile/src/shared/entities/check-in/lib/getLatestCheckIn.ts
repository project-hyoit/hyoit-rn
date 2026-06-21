import type { CheckInItem } from "../model/types";

export const getLatestCheckIn = (items: CheckInItem[]) => {
  return items[0] ?? null;
};
