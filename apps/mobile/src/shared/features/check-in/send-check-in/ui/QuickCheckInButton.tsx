import { Pressable, StyleSheet, Text } from "react-native";

interface QuickCheckInButtonProps {
  label: string;
  onPress: () => void;
}

export default function QuickCheckInButton({
  label,
  onPress,
}: QuickCheckInButtonProps) {
  return (
    <Pressable style={s.button} onPress={onPress}>
      <Text style={s.label}>{label}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  button: {
    flex: 1,
    minWidth: "48%",
    minHeight: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#222222",
  },
});
