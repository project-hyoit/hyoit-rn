import { CHECK_IN_OPPONENT_LABELS } from "../model/constants";
import type { CheckInViewerRole } from "../model/types";

export const getCheckInOpponentLabel = (role: CheckInViewerRole) => {
  return CHECK_IN_OPPONENT_LABELS[role];
};
