import { useAuthStore } from "@hyoit/auth";
import { router } from "expo-router";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

import ConnectedChildCard from "./ConnectedChildCard";

export default function SuccessScreen() {
  const setOnboarded = useAuthStore((state) => state.setOnboarded);
  const child = { name: "김유찬", phone: "010-4610-3405" };

  const start = () => {
    setOnboarded(true);
    router.replace("/(parent)");
  };

  return (
    <View style={s.wrap}>
      <Text style={s.title} allowFontScaling={false}>
        자녀 분과 연결이{"\n"}완료되었어요
      </Text>

      <Text style={s.cardTitle} allowFontScaling={false}>
        연결된 자녀분
      </Text>

      <ConnectedChildCard name={child.name} phone={child.phone} />

      <Pressable
        onPress={start}
        hitSlop={8}
        style={({ pressed }) => [s.primaryButton, pressed && s.pressed]}
        accessibilityRole="button"
        accessibilityLabel="시작하기"
      >
        <Text style={s.primaryText} allowFontScaling={false}>
          시작하기
        </Text>
      </Pressable>
    </View>
  );
}

const COLORS = {
  bg: "#FFFFFF",
  text: "#000000",
  primary: "#1E90FF",
};

const s = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 24,
    paddingTop: 120,
  },
  title: {
    fontSize: 24,
    lineHeight: 36,
    color: COLORS.text,
    fontWeight: "600",
    marginBottom: 44,
  },
  cardTitle: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: "600",
    marginBottom: 30,
  },
  primaryButton: {
    marginBottom: 58,
    marginTop: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 2 },
    }),
  },
  pressed: {
    opacity: 0.9,
  },
  primaryText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },
});
