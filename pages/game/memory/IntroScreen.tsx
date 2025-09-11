// pages/game/memory/IntroScreen.tsx
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

const LEVELS = [
  { key: "easy", label: "쉬움", secs: 90 },
  { key: "normal", label: "보통", secs: 60 },
  { key: "hard", label: "어려움", secs: 30 },
];

export default function IntroScreen() {
  const [level, setLevel] = useState(LEVELS[0]);
  return (
    <View style={{ padding: 20, gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: "800" }}>카드 맞추기</Text>
      {LEVELS.map((lv) => (
        <Pressable
          key={lv.key}
          onPress={() => setLevel(lv)}
          style={{ padding: 14, backgroundColor: "#fff", borderRadius: 12 }}
        >
          <Text style={{ fontWeight: "700" }}>{lv.label}</Text>
          <Text>{lv.secs}초가 주어져요</Text>
        </Pressable>
      ))}
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/game/memory/play",
            params: { level: level.key, secs: String(level.secs) },
          })
        }
        style={{
          padding: 14,
          borderRadius: 12,
          backgroundColor: "#111",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "700" }}>시작하기</Text>
      </Pressable>
    </View>
  );
}
