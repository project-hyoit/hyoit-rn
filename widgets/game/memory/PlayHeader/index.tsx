import { DANGER, TEXT } from "@/shared/config/theme";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  title: string; // "쉬움 난이도"
  untilStart: number; // 5,4,3...
  wrong: number; // 틀린 횟수
};

export default function PlayHeader({ title, untilStart, wrong }: Props) {
  const router = useRouter();
  return (
    <>
      <View style={s.topRow}>
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Text style={s.back}>◀</Text>
        </Pressable>
        <Text style={s.title}>{title}</Text>
      </View>

      <View style={s.centerStats}>
        <Text style={s.label}>시작까지</Text>
        <Text style={s.big}>{untilStart}초</Text>
        <Text style={s.wrong}>틀린 횟수: {wrong}</Text>
      </View>

      <Text style={s.guide}>
        위치를 기억하고 알맞은 모양의 카드끼리 뒤집으세요
      </Text>
    </>
  );
}

const s = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  back: {
    fontSize: 24,
    fontWeight: "900",
    color: TEXT,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: TEXT,
  },
  centerStats: {
    alignItems: "center",
    marginTop: 12,
    gap: 4,
  },
  label: {
    fontSize: 16,
    color: TEXT,
    fontWeight: "800",
  },
  big: {
    fontSize: 32,
    fontWeight: "900",
    color: TEXT,
  },
  wrong: {
    marginTop: 6,
    fontSize: 15,
    color: DANGER,
    fontWeight: "800",
  },
  guide: {
    marginTop: 30,
    textAlign: "center",
    paddingHorizontal: 20,
    color: "#111",
    fontSize: 15,
  },
});
