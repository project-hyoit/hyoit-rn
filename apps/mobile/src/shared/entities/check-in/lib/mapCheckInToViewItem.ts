import type {
  CheckInDisplayStatus,
  CheckInItem,
  CheckInRawItem,
  CheckInViewerRole,
} from "../model/types";

export const mapCheckInToViewItem = (
  item: CheckInRawItem,
  viewerRole: CheckInViewerRole
): CheckInItem => {
  const isSentByViewer = item.senderRole === viewerRole;
  const direction = isSentByViewer ? "SENT" : "RECEIVED";

  let status: CheckInDisplayStatus;

  if (direction === "RECEIVED") {
    status = item.checkedAt ? "CHECKED" : "NEW";
  } else {
    status = item.checkedAt ? "CONFIRMED" : "WAITING_CONFIRM";
  }

  return {
    ...item,
    direction,
    status,
  };
};
