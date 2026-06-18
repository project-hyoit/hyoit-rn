import type { CheckInRawItem } from "./types";

export const mockCheckInRawItems: CheckInRawItem[] = [
  {
    id: "1",
    senderRole: "child",
    receiverRole: "parent",
    message: "잘 지내고 있니?",
    type: "QUESTION",
    createdAt: "2026-06-18T15:14:00",
  },
  {
    id: "2",
    senderRole: "parent",
    receiverRole: "child",
    message: "엄마 연락 안받아?",
    type: "QUESTION",
    createdAt: "2026-06-17T15:14:00",
  },
  {
    id: "3",
    senderRole: "parent",
    receiverRole: "child",
    message: "잘 지내고 있니?",
    type: "QUESTION",
    createdAt: "2026-06-16T15:14:00",
    checkedAt: "2026-06-16T15:20:00",
  },
];
