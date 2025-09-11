import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  size: number; // 정사각 타일 한 변 길이
  emoji: string; // 우선 이모지로 표현
  disabled?: boolean; // 카운트다운 중 비활성화 등
  onPress?: () => void;
};

export default function MemoryTile({ size, emoji, disabled, onPress }: Props) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        s.box,
        { width: size, height: size, borderRadius: 12 },
        pressed && { opacity: 0.9 },
      ]}
    >
      <View style={s.inner}>
        <Text style={[s.emoji, { fontSize: Math.round(size * 0.55) }]}>
          {emoji}
        </Text>
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  box: {
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#111",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  inner: { flex: 1, alignItems: "center", justifyContent: "center" },
  emoji: { textAlign: "center" },
});
