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

type SendCheckInParams = CreateCheckInParams & {
  items: CheckInRawItem[];
};

type SendCheckInResult = {
  items: CheckInRawItem[];
  sentItem: CheckInRawItem | null;
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
}: CreateCheckInParams): CheckInRawItem | null => {
  const normalizedMessage = message.trim();
  if (!normalizedMessage) return null;

  return {
    id,
    senderRole,
    receiverRole: getReceiverRole(senderRole),
    message: normalizedMessage,
    type: "QUESTION",
    createdAt,
  };
};

export const sendCheckIn = ({
  items,
  ...params
}: SendCheckInParams): SendCheckInResult => {
  const sentItem = createCheckIn(params);
  if (!sentItem) return { items, sentItem: null };

  return {
    items: [sentItem, ...items],
    sentItem,
  };
};

export const markCheckInAsChecked = ({
  items,
  itemId,
  viewerRole,
  checkedAt,
}: MarkCheckInAsCheckedParams): CheckInRawItem[] => {
  const targetIndex = items.findIndex((item) => item.id === itemId);
  if (targetIndex < 0) return items;

  const target = items[targetIndex];
  if (target.receiverRole !== viewerRole || target.checkedAt) return items;

  const nextItems = [...items];
  nextItems[targetIndex] = {
    ...target,
    checkedAt,
  };

  return nextItems;
};
