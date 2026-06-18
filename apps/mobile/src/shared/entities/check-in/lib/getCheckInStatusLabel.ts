import { CHECK_IN_STATUS_LABELS } from "../model/constants";
import type { CheckInDisplayStatus, CheckInViewerRole } from "../model/types";

export const getCheckInStatusLabel = (
  role: CheckInViewerRole,
  status: CheckInDisplayStatus
) => {
  return CHECK_IN_STATUS_LABELS[role][status];
};
