import { StyleSheet, Text, View } from "react-native";

import { NotificationButton } from "@/src/shared/ui";

interface ParentCheckInHeaderProps {
  hasNotification?: boolean;
  onPressNotification?: () => void;
}

export default function ParentCheckInHeader({
  hasNotification = false,
  onPressNotification,
}: ParentCheckInHeaderProps) {
  return (
    <View style={s.header}>
      <View style={s.placeholder} />

      <Text style={s.title}>안부 보내기</Text>

      <NotificationButton
        hasNotification={hasNotification}
        onPress={onPressNotification}
      />
    </View>
  );
}

const s = StyleSheet.create({
  header: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  placeholder: {
    width: 58,
  },

  title: {
    fontSize: 17,
    fontWeight: "900",
    color: "#111111",
  },
});
