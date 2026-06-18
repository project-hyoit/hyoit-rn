import { Pressable, StyleSheet, Text, View } from "react-native";

import { IconSymbol } from "@/src/shared/ui/IconSymbol";

interface ParentCheckInHeaderProps {
  onPressNotification?: () => void;
}

export default function ParentCheckInHeader({
  onPressNotification,
}: ParentCheckInHeaderProps) {
  return (
    <View style={s.header}>
      <View style={s.placeholder} />

      <Text style={s.title}>안부 보내기</Text>

      <Pressable style={s.iconButton} onPress={onPressNotification}>
        <IconSymbol name="bell.fill" size={28} color="#555555" />
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  header: {
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  placeholder: {
    width: 36,
  },

  title: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111111",
  },

  iconButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
});
