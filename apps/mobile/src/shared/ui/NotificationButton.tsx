import { Pressable, StyleSheet, View } from "react-native";

import { IconSymbol } from "./IconSymbol";

interface NotificationButtonProps {
  hasNotification?: boolean;
  onPress?: () => void;
}

export default function NotificationButton({
  hasNotification = false,
  onPress,
}: NotificationButtonProps) {
  return (
    <Pressable style={s.button} onPress={onPress}>
      <IconSymbol name="bell.fill" size={24} color="#555555" />

      {hasNotification && <View style={s.dot} />}
    </Pressable>
  );
}

const s = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 3,
  },

  dot: {
    position: "absolute",
    top: 8,
    right: 9,
    width: 9,
    height: 9,
    borderRadius: 999,
    backgroundColor: "#1478FF",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
});
