import { StyleSheet, Text, View } from "react-native";

import {
  formatCheckInTime,
  getCheckInStatusLabel,
  type CheckInItem,
} from "@/src/shared/entities/check-in";
import { ConfirmCheckInButton } from "@/src/shared/features/check-in/confirm-check-in";

interface ParentCheckInStatusBannerProps {
  latestItem: CheckInItem | null;
  onConfirm: (item: CheckInItem) => void;
}

const getBannerColor = (item: CheckInItem | null) => {
  if (!item) {
    return {
      backgroundColor: "#FFFFFF",
      borderColor: "#E4E4E4",
      labelColor: "#8A8A8A",
    };
  }

  if (item.direction === "RECEIVED" && item.status === "NEW") {
    return {
      backgroundColor: "#EEF5FF",
      borderColor: "#75B7FF",
      labelColor: "#1478FF",
    };
  }

  if (item.direction === "RECEIVED" && item.status === "CHECKED") {
    return {
      backgroundColor: "#F3F3F3",
      borderColor: "#D8D8D8",
      labelColor: "#9A9A9A",
    };
  }

  if (item.direction === "SENT" && item.status === "WAITING_CONFIRM") {
    return {
      backgroundColor: "#EAF8EF",
      borderColor: "#9CDEB2",
      labelColor: "#3D9B5E",
    };
  }

  return {
    backgroundColor: "#EAF8EF",
    borderColor: "#9CDEB2",
    labelColor: "#3D9B5E",
  };
};

export default function ParentCheckInStatusBanner({
  latestItem,
  onConfirm,
}: ParentCheckInStatusBannerProps) {
  const color = getBannerColor(latestItem);

  if (!latestItem) {
    return (
      <View
        style={[
          s.container,
          {
            backgroundColor: color.backgroundColor,
            borderColor: color.borderColor,
          },
        ]}
      >
        <View style={s.textArea}>
          <Text style={s.statusLabel}>안부 없음</Text>
          <Text style={s.title}>아직 도착한 안부가 없어요!</Text>
          <Text style={s.description}>한번 먼저 안부를 보내볼까요?</Text>
        </View>

        <View style={s.characterBox}>
          <Text style={s.character}>🐭</Text>
        </View>
      </View>
    );
  }

  const statusLabel = getCheckInStatusLabel("parent", latestItem.status);
  const canConfirm =
    latestItem.direction === "RECEIVED" && latestItem.status === "NEW";

  return (
    <View
      style={[
        s.container,
        {
          backgroundColor: color.backgroundColor,
          borderColor: color.borderColor,
        },
      ]}
    >
      <View style={s.textArea}>
        <Text style={[s.statusLabel, { color: color.labelColor }]}>
          {statusLabel}
        </Text>

        <Text style={s.title}>“{latestItem.message}”</Text>

        <Text style={s.time}>{formatCheckInTime(latestItem.createdAt)}</Text>

        {latestItem.direction === "SENT" && (
          <Text style={s.description}>
            {latestItem.status === "CONFIRMED"
              ? "자녀가 확인을 완료했어요!"
              : "자녀가 아직 확인하지 않았어요!"}
          </Text>
        )}

        {canConfirm && (
          <View style={s.confirmButtonArea}>
            <ConfirmCheckInButton onPress={() => onConfirm(latestItem)} />
          </View>
        )}
      </View>

      <View style={s.characterBox}>
        <Text style={s.character}>🐭</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    minHeight: 150,
    borderRadius: 12,
    borderWidth: 1.5,
    padding: 16,
    flexDirection: "row",
    overflow: "hidden",
  },

  textArea: {
    flex: 1,
  },

  statusLabel: {
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 8,
  },

  title: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "900",
    color: "#111111",
  },

  time: {
    marginTop: 8,
    fontSize: 12,
    color: "#777777",
  },

  description: {
    marginTop: 14,
    fontSize: 12,
    fontWeight: "700",
    color: "#333333",
  },

  confirmButtonArea: {
    marginTop: 14,
  },

  characterBox: {
    width: 96,
    alignItems: "center",
    justifyContent: "center",
  },

  character: {
    fontSize: 58,
  },
});
