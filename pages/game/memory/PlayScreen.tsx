import type { FruitKey } from "@/shared/assets/fruits";
import { BG } from "@/shared/config/theme";
import BottomTray from "@/widgets/game/memory/BottomTray";
import MemoryBoard from "@/widgets/game/memory/MemoryBoard";
import PlayHeader from "@/widgets/game/memory/PlayHeader";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const FRUITS: FruitKey[] = [
  "banana",
  "apple",
  "grape",
  "lemon",
  "peach",
  "cherry",
  "persimmon",
  "orange",
];

export default function PlayScreen() {
  const { level } = useLocalSearchParams<{ level?: string }>();
  const insets = useSafeAreaInsets();

  // 난이도별 카드 종류 수(짝이므로 *2장이 됨)
  const count = level === "easy" ? 4 : level === "hard" ? 8 : 6;

  // 이번 판에 쓰는 과일들(트레이도 이걸로)
  const base = useMemo(() => FRUITS.slice(0, count), [count]);

  // 셔플 덱 (✅ j와 스왑!)
  const deck = useMemo(() => {
    const pairs: FruitKey[] = [...base, ...base];
    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }
    return pairs;
  }, [base]);

  // 단계: preview → playing → done
  const [phase, setPhase] = useState<"preview" | "playing" | "done">("preview");

  // 프리뷰 시간(전부 보여주고, 입력은 막음)
  useEffect(() => {
    if (phase !== "preview") return;
    const t = setTimeout(() => setPhase("playing"), 2500);
    return () => clearTimeout(t);
  }, [phase]);

  // 하트(HP): 난이도별 최대값
  const MAX_HP = useMemo(() => {
    if (level === "easy") return 8;
    if (level === "hard") return 5;
    return 6;
  }, [level]);

  const [wrong, setWrong] = useState(0);
  useEffect(() => setWrong(0), [MAX_HP, count, level]); // 난이도 바뀌면 리셋
  const hearts = Math.max(0, MAX_HP - wrong);

  useEffect(() => {
    if (hearts <= 0 && phase === "playing") setPhase("done");
  }, [hearts, phase]);

  // 진행도(전부 맞추면 종료)
  const [pairsLeft, setPairsLeft] = useState(count);
  useEffect(() => setPairsLeft(count), [count]);

  const [trayH, setTrayH] = useState(0);

  return (
    <View style={s.page}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        alwaysBounceVertical={false}
        overScrollMode="never"
        contentInsetAdjustmentBehavior="never"
        contentContainerStyle={[
          s.content,
          { paddingBottom: trayH + insets.bottom + 12, flexGrow: 1 },
        ]}
      >
        {/* 상단: 뒤로가기 + 난이도 + 하트만 */}
        <PlayHeader title={`${labelFromLevel(level)} 난이도`} hearts={hearts} />

        <View style={{ height: 10 }} />

        <MemoryBoard
          items={deck}
          revealAll={phase === "preview"} // ← 프리뷰때 모두 공개
          disabled={phase !== "playing"} // 프리뷰/종료엔 입력 막기
          onMismatch={() => setWrong((w) => w + 1)}
          onPairMatched={() =>
            setPairsLeft((v) => {
              const next = Math.max(0, v - 1);
              if (next === 0) setPhase("done");
              return next;
            })
          }
        />
      </ScrollView>

      {/* 트레이: 이번 판 과일만 */}
      <View style={s.trayWrap} pointerEvents="box-none">
        <View
          onLayout={(e) => setTrayH(e.nativeEvent.layout.height)}
          pointerEvents="box-none"
        >
          <BottomTray remaining={base} style={{ marginTop: 0 }} />
        </View>
        <View
          style={[s.bottomPad, { height: insets.bottom }]}
          pointerEvents="none"
        />
      </View>
    </View>
  );
}

function labelFromLevel(level?: string) {
  if (level === "easy") return "쉬움";
  if (level === "hard") return "어려움";
  return "보통";
}

const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: BG },
  content: { paddingTop: 50 },
  trayWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 0,
  },
  bottomPad: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
  },
});
