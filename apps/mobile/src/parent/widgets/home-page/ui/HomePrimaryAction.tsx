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
        size={26}
        tintColor="#FFFFFF"
        fallback="✈️"
      />

      <Text style={s.label}>{label}</Text>

      <SymbolView
        name="chevron.right"
        size={24}
        tintColor="#FFFFFF"
        fallback="›"
      />
    </Pressable>
  );
}

const s = StyleSheet.create({
  container: {
    height: 64,
    borderRadius: 16,
    backgroundColor: "#0A84FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    paddingHorizontal: 20,
  },

  label: {
    flex: 1,
    textAlign: "center",
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "900",
    color: "#FFFFFF",
  },
});
