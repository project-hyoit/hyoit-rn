import { SymbolView } from "expo-symbols";
import { Pressable, StyleSheet, Text } from "react-native";

type HomePrimaryActionProps = {
  label: string;
  onPress: () => void;
};

export default function HomePrimaryAction({
  label,
  onPress,
}: HomePrimaryActionProps) {
  return (
    <Pressable style={s.container} onPress={onPress}>
      <SymbolView
        name="paperplane.fill"
        size={30}
        tintColor="#FFFFFF"
        fallback="✈️"
      />

      <Text style={s.label}>{label}</Text>

      <SymbolView
        name="chevron.right"
        size={26}
        tintColor="#FFFFFF"
        fallback="›"
      />
    </Pressable>
  );
}

const s = StyleSheet.create({
  container: {
    height: 63,
    borderRadius: 16,
    backgroundColor: "#0A84FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    paddingHorizontal: 18,
    shadowColor: "#1478FF",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },

  label: {
    flex: 1,
    textAlign: "center",
    fontSize: 22,
    lineHeight: 29,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: -0.4,
  },
});
