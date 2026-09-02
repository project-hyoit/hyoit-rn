import type {
  CheckInRawItem,
  CheckInViewerRole,
} from "../model/types";

type CreateCheckInParams = {
  senderRole: CheckInViewerRole;
  message: string;
  id: string;
  createdAt: string;
};

type MarkCheckInAsCheckedParams = {
  items: CheckInRawItem[];
  itemId: string;
  viewerRole: CheckInViewerRole;
  checkedAt: string;
};

const getReceiverRole = (
  senderRole: CheckInViewerRole,
): CheckInViewerRole => (senderRole === "parent" ? "child" : "parent");

export const createCheckIn = ({
  senderRole,
  message,
  id,
  createdAt,
}: CreateCheckInParams): CheckInRawItem => ({
  id,
  senderRole,
  receiverRole: getReceiverRole(senderRole),
  message,
  type: "QUESTION",
  createdAt,
});

export const markCheckInAsChecked = ({
  items,
  itemId,
  viewerRole,
  checkedAt,
}: MarkCheckInAsCheckedParams): CheckInRawItem[] =>
  items.map((item) => {
    if (item.id !== itemId) return item;
    if (item.receiverRole !== viewerRole) return item;
    if (item.checkedAt) return item;

    return {
      ...item,
      checkedAt,
    };
  });
