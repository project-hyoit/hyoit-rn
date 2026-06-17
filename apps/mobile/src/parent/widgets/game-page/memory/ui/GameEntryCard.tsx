import { SymbolView } from "expo-symbols";
import { Pressable, StyleSheet, Text, View } from "react-native";

type GameEntryCardProps = {
  title: string;
  body: string;
  onPress: () => void;
};

export default function GameEntryCard({
  title,
  body,
  onPress,
}: GameEntryCardProps) {
  return (
    <Pressable style={s.container} onPress={onPress}>
      <View style={s.textArea}>
        <Text style={s.eyebrow}>가벼운 놀이</Text>
        <Text style={s.title}>{title}</Text>
        <Text style={s.body}>{body}</Text>

        <View style={s.cta}>
          <Text style={s.ctaText}>시작하기</Text>
          <Text style={s.ctaText}>›</Text>
        </View>
      </View>

      <View style={s.iconArea}>
        <SymbolView
          name="gamecontroller.fill"
          size={54}
          tintColor="#25874E"
          fallback="🎮"
        />
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  container: {
    position: "relative",
    minHeight: 180,
    borderRadius: 24,
    padding: 22,
    backgroundColor: "#EFFFF4",
    overflow: "hidden",
  },

  textArea: {
    width: "68%",
    zIndex: 2,
  },

  eyebrow: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
    color: "#25874E",
  },

  title: {
    marginTop: 8,
    fontSize: 25,
    lineHeight: 32,
    fontWeight: "900",
    color: "#111111",
    letterSpacing: -0.5,
  },

  body: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 23,
    fontWeight: "700",
    color: "#777777",
  },

  cta: {
    alignSelf: "flex-start",
    marginTop: 18,
    minHeight: 34,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#25874E",
    backgroundColor: "rgba(255, 255, 255, 0.65)",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  ctaText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "900",
    color: "#25874E",
  },

  iconArea: {
    position: "absolute",
    right: 22,
    bottom: 24,
    width: 90,
    height: 90,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.65)",
    alignItems: "center",
    justifyContent: "center",
  },
});
