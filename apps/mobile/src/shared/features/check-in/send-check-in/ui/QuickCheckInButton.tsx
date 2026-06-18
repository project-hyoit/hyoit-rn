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
    width: "48%",
    minHeight: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,

    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },

  label: {
    fontSize: 15,
    fontWeight: "800",
    color: "#222222",
  },
});
