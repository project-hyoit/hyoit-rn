import { Pressable, StyleSheet, Text } from "react-native";

interface ConfirmCheckInButtonProps {
  label?: string;
  backgroundColor?: string;
  onPress: () => void;
}

export default function ConfirmCheckInButton({
  label = "안부 확인하기",
  backgroundColor = "#1478FF",
  onPress,
}: ConfirmCheckInButtonProps) {
  return (
    <Pressable style={[s.button, { backgroundColor }]} onPress={onPress}>
      <Text style={s.label}>∨ {label}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
    minHeight: 38,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "800",
    color: "#FFFFFF",
  },
});
