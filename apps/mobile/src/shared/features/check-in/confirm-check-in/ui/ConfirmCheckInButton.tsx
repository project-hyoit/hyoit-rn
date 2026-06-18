import { Pressable, StyleSheet, Text } from "react-native";

interface ConfirmCheckInButtonProps {
  label?: string;
  onPress: () => void;
}

export default function ConfirmCheckInButton({
  label = "안부 확인하기",
  onPress,
}: ConfirmCheckInButtonProps) {
  return (
    <Pressable style={s.button} onPress={onPress}>
      <Text style={s.label}>∨ {label}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
    minHeight: 34,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: "#1478FF",
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFFFFF",
  },
});
