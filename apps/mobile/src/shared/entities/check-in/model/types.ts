export type CheckInViewerRole = "parent" | "child";

export type CheckInDirection = "SENT" | "RECEIVED";

export type CheckInDisplayStatus =
  | "NEW"
  | "CHECKED"
  | "WAITING_CONFIRM"
  | "CONFIRMED";

export type CheckInMessageType = "QUESTION" | "REPLY";

export interface CheckInRawItem {
  id: string;
  senderRole: CheckInViewerRole;
  receiverRole: CheckInViewerRole;
  message: string;
  type: CheckInMessageType;
  createdAt: string;
  checkedAt?: string;
}

export interface CheckInItem extends CheckInRawItem {
  direction: CheckInDirection;
  status: CheckInDisplayStatus;
}
