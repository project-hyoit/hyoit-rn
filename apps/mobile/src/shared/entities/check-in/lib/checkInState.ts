import type {
  CheckInRawItem,
  CheckInViewerRole,
} from "../model/types";

const getReceiverRole = (
  senderRole: CheckInViewerRole,
): CheckInViewerRole => (senderRole === "parent" ? "child" : "parent");

export const createCheckIn = (
  senderRole: CheckInViewerRole,
  message: string,
  id: string,
  createdAt: string,
): CheckInRawItem => ({
  id,
  senderRole,
  receiverRole: getReceiverRole(senderRole),
  message,
  type: "QUESTION",
  createdAt,
});
export const markCheckInAsChecked = (
  items: CheckInRawItem[],
  itemId: string,
  viewerRole: CheckInViewerRole,
  checkedAt: string,
): CheckInRawItem[] =>
  items.map((item) => {
    if (item.id !== itemId) return item;
    if (item.receiverRole !== viewerRole) return item;
    if (item.checkedAt) return item;

    return {
      ...item,
      checkedAt,
    };
  });
