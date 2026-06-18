import { StyleSheet, Text, View } from "react-native";

import {
  formatCheckInTime,
  getCheckInStatusLabel,
  type CheckInItem,
} from "@/src/shared/entities/check-in";
import { ConfirmCheckInButton } from "@/src/shared/features/check-in/confirm-check-in";

interface ParentCheckInStatusBannerProps {
  latestItem: CheckInItem | null;
  pendingCount: number;
  onConfirm: (item: CheckInItem) => void;
}

const getBannerColor = (item: CheckInItem | null, pendingCount: number) => {
  if (!item) {
    return {
      backgroundColor: "#FFFFFF",
      borderColor: "#DEDEDE",
      labelColor: "#555555",
    };
  }

  if (item.direction === "RECEIVED" && item.status === "NEW") {
    if (pendingCount >= 2) {
      return {
        backgroundColor: "#F1EAFF",
        borderColor: "#9D83EA",
        labelColor: "#7658D6",
      };
    }

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

  return {
    backgroundColor: "#EAF8EF",
    borderColor: "#9CDEB2",
    labelColor: "#3D9B5E",
  };
};

export default function ParentCheckInStatusBanner({
  latestItem,
  pendingCount,
  onConfirm,
}: ParentCheckInStatusBannerProps) {
  const color = getBannerColor(latestItem, pendingCount);

  if (!latestItem) {
    return (
      <View style={s.emptyContainer}>
        <View style={s.emptyTextArea}>
          <Text style={s.emptyStatusLabel}>안부 없음</Text>

          <Text style={s.emptyTitle}>아직 도착한{"\n"}안부가 없어요!</Text>

          <Text style={s.emptyDescription}>
            한번 먼저 안부를{"\n"}보내볼까요?
          </Text>
        </View>

        <View style={s.emptyCharacterArea}>
          <Text style={s.emptyCharacter}>🐨</Text>
        </View>
      </View>
    );
  }

  const statusLabel =
    latestItem.direction === "RECEIVED" && pendingCount >= 2
      ? `새 안부 ${pendingCount}개`
      : getCheckInStatusLabel("parent", latestItem.status);

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

        {latestItem.direction === "RECEIVED" && pendingCount >= 2 && (
          <Text style={s.description}>
            확인하지 않은 안부가 {pendingCount - 1}개 더 있어요.
          </Text>
        )}

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

      <View style={s.characterArea}>
        <Text style={s.character}>🐨</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  emptyContainer: {
    minHeight: 164,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#DEDEDE",
    backgroundColor: "#FFFFFF",
    paddingLeft: 22,
    paddingVertical: 24,
    flexDirection: "row",
    overflow: "hidden",
  },

  emptyTextArea: {
    flex: 1,
    zIndex: 1,
  },

  emptyStatusLabel: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
    color: "#555555",
    marginBottom: 12,
  },

  emptyTitle: {
    fontSize: 27,
    lineHeight: 34,
    fontWeight: "900",
    color: "#050505",
    marginBottom: 22,
  },

  emptyDescription: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
    color: "#8A8A8A",
  },

  emptyCharacterArea: {
    width: 172,
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: -18,
    marginBottom: -16,
  },

  emptyCharacter: {
    fontSize: 96,
  },

  container: {
    minHeight: 164,
    borderRadius: 12,
    borderWidth: 1.5,
    paddingLeft: 22,
    paddingVertical: 22,
    paddingRight: 10,
    flexDirection: "row",
    overflow: "hidden",
  },

  textArea: {
    flex: 1,
    zIndex: 1,
  },

  statusLabel: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "900",
    marginBottom: 10,
  },

  title: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "900",
    color: "#050505",
  },

  time: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "600",
    color: "#777777",
  },

  description: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
    color: "#666666",
  },

  confirmButtonArea: {
    marginTop: 14,
  },

  characterArea: {
    width: 126,
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: -8,
    marginBottom: -10,
  },

  character: {
    fontSize: 84,
  },
});
