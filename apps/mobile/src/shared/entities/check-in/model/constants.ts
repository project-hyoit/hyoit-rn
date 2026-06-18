import type { CheckInDisplayStatus, CheckInViewerRole } from "./types";

export const QUICK_CHECK_IN_MESSAGES = [
  "잘 지내고 있어요 😊",
  "사랑해~ 💗",
  "밥 잘 먹고 다녀 🍚",
  "통화 한번 해 📞",
] as const;

export const CHECK_IN_STATUS_LABELS: Record<
  CheckInViewerRole,
  Record<CheckInDisplayStatus, string>
> = {
  parent: {
    NEW: "새 안부",
    CHECKED: "확인함",
    WAITING_CONFIRM: "자녀 확인 전",
    CONFIRMED: "자녀 확인함",
  },
  child: {
    NEW: "새 안부",
    CHECKED: "확인함",
    WAITING_CONFIRM: "부모님 확인 전",
    CONFIRMED: "부모님 확인함",
  },
};

export const CHECK_IN_OPPONENT_LABELS: Record<CheckInViewerRole, string> = {
  parent: "자녀",
  child: "부모님",
};
