import type { CheckInRawItem } from "./types";

export const emptyCheckInMock: CheckInRawItem[] = [];

export const newCheckInMock: CheckInRawItem[] = [
  {
    id: "1",
    senderRole: "child",
    receiverRole: "parent",
    message: "잘 지내고 있니?",
    type: "QUESTION",
    createdAt: "2026-06-18T15:14:00",
  },
];

export const checkedCheckInMock: CheckInRawItem[] = [
  {
    id: "1",
    senderRole: "child",
    receiverRole: "parent",
    message: "잘 지내고 있니?",
    type: "QUESTION",
    createdAt: "2026-06-18T15:14:00",
    checkedAt: "2026-06-18T15:20:00",
  },
];

export const multipleNewCheckInMock: CheckInRawItem[] = [
  {
    id: "1",
    senderRole: "child",
    receiverRole: "parent",
    message: "잘 지내고 있어?",
    type: "QUESTION",
    createdAt: "2026-06-18T15:14:00",
  },
  {
    id: "2",
    senderRole: "child",
    receiverRole: "parent",
    message: "엄마 연락 안봐?",
    type: "QUESTION",
    createdAt: "2026-06-17T15:14:00",
  },
  {
    id: "3",
    senderRole: "child",
    receiverRole: "parent",
    message: "잘 지내고 있니?",
    type: "QUESTION",
    createdAt: "2026-06-16T15:14:00",
    checkedAt: "2026-06-16T15:20:00",
  },
];

export const sentWaitingCheckInMock: CheckInRawItem[] = [
  {
    id: "1",
    senderRole: "parent",
    receiverRole: "child",
    message: "응 잘 지내",
    type: "QUESTION",
    createdAt: "2026-06-18T15:14:00",
  },
  {
    id: "2",
    senderRole: "child",
    receiverRole: "parent",
    message: "엄마 연락 안봐?",
    type: "QUESTION",
    createdAt: "2026-06-17T15:14:00",
  },
  {
    id: "3",
    senderRole: "child",
    receiverRole: "parent",
    message: "잘 지내고 있니?",
    type: "QUESTION",
    createdAt: "2026-06-16T15:14:00",
    checkedAt: "2026-06-16T15:20:00",
  },
];

export const sentConfirmedCheckInMock: CheckInRawItem[] = [
  {
    id: "1",
    senderRole: "parent",
    receiverRole: "child",
    message: "잘 지내고 있어요",
    type: "QUESTION",
    createdAt: "2026-06-18T15:14:00",
    checkedAt: "2026-06-18T15:20:00",
  },
  {
    id: "2",
    senderRole: "child",
    receiverRole: "parent",
    message: "엄마 연락 안봐?",
    type: "QUESTION",
    createdAt: "2026-06-17T15:14:00",
  },
];

export const checkInMockPresets = {
  empty: emptyCheckInMock,
  new: newCheckInMock,
  checked: checkedCheckInMock,
  multipleNew: multipleNewCheckInMock,
  sentWaiting: sentWaitingCheckInMock,
  sentConfirmed: sentConfirmedCheckInMock,
} as const;

export type CheckInMockPresetKey = keyof typeof checkInMockPresets;
