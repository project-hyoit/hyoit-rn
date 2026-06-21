import { StyleSheet, Text, View } from "react-native";

import {
  formatCheckInTime,
  getCheckInStatusLabel,
  type CheckInItem,
} from "@/src/shared/entities/check-in";

interface ParentCheckInHistoryCardProps {
  item: CheckInItem;
}

const getStatusMark = (status: CheckInItem["status"]) => {
  switch (status) {
    case "NEW":
      return "N";
    case "CONFIRMED":
      return "✓";
    case "WAITING_CONFIRM":
      return "◷";
    case "CHECKED":
    default:
      return "∨";
  }
};

export default function ParentCheckInHistoryCard({
  item,
}: ParentCheckInHistoryCardProps) {
  const isReceived = item.direction === "RECEIVED";

  return (
    <View style={[s.card, item.status === "CHECKED" && s.checkedCard]}>
      <View style={s.content}>
        <Text style={[s.badge, !isReceived && s.sentBadge]}>
          {isReceived ? "받은 안부" : "보낸 안부"}
        </Text>

        <Text style={s.message}>“{item.message}”</Text>

        <Text style={s.meta}>
          {formatCheckInTime(item.createdAt)}{" "}
          <Text
            style={[
              s.statusText,
              item.status === "NEW" && s.newText,
              item.status === "WAITING_CONFIRM" && s.waitingText,
              item.status === "CONFIRMED" && s.confirmedText,
            ]}
          >
            {getCheckInStatusLabel("parent", item.status)}
          </Text>
        </Text>
      </View>

      <View
        style={[
          s.statusCircle,
          item.status === "NEW" && s.newCircle,
          item.status === "WAITING_CONFIRM" && s.waitingCircle,
          item.status === "CONFIRMED" && s.confirmedCircle,
        ]}
      >
        <Text
          style={[
            s.statusCircleText,
            item.status === "WAITING_CONFIRM" && s.waitingCircleText,
          ]}
        >
          {getStatusMark(item.status)}
        </Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    minHeight: 76,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  checkedCard: {
    backgroundColor: "#F3F3F3",
  },

  content: {
    flex: 1,
    gap: 5,
  },

  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#EAF3FF",
    fontSize: 11,
    fontWeight: "800",
    color: "#1478FF",
  },

  sentBadge: {
    backgroundColor: "#EAF8EF",
    color: "#3D9B5E",
  },

  message: {
    fontSize: 15,
    fontWeight: "900",
    color: "#111111",
  },

  meta: {
    fontSize: 12,
    fontWeight: "700",
    color: "#8A8A8A",
  },

  statusText: {
    color: "#777777",
  },

  newText: {
    color: "#FF5C72",
  },

  waitingText: {
    color: "#FF7A00",
  },

  confirmedText: {
    color: "#3D9B5E",
  },

  statusCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#BDBDBD",
    alignItems: "center",
    justifyContent: "center",
  },

  newCircle: {
    backgroundColor: "#FF5C72",
  },

  waitingCircle: {
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: "#FF7A00",
  },

  confirmedCircle: {
    backgroundColor: "#3D9B5E",
  },

  statusCircleText: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: "900",
    color: "#FFFFFF",
  },

  waitingCircleText: {
    color: "#FF7A00",
  },
});
