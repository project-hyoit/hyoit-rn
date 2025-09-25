import type { FruitKey } from "@/shared/assets/fruits";
import { FRUITS } from "@/shared/assets/fruits";
import { BG } from "@/shared/config/theme";
import BottomTray from "@/widgets/game/memory/BottomTray";
import MemoryBoard from "@/widgets/game/memory/MemoryBoard";
import PlayHeader from "@/widgets/game/memory/PlayHeader";
import ResultOverlay from "@/widgets/game/memory/ResultOverlay";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PlayScreen() {
  const { level } = useLocalSearchParams<{
    level?: string; // 난이도
  }>();
  const insets = useSafeAreaInsets();

  const cardCount = level === "easy" ? 4 : level === "hard" ? 8 : 6;

  const base = useMemo(() => FRUITS.slice(0, cardCount), [cardCount]);

  const [matchedFruits, setMatchedFruits] = useState<Set<FruitKey>>(new Set());
  useEffect(() => setMatchedFruits(new Set()), [cardCount, level]);

  const [doneType, setDoneType] = useState<null | "success" | "fail">(null);
  const [seed, setSeed] = useState(0);

  const deck = useMemo(() => {
    const pairs = [...base, ...base];
    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }
    return pairs.map((fruit, index) => ({
      id: `${fruit}_${index}_${seed}`,
      fruit: fruit,
    }));
  }, [base, seed]);

  const [phase, setPhase] = useState<"countdown" | "playing" | "done">(
    "countdown"
  );
  const [untilStart, setUntilStart] = useState(3);

  useEffect(() => {
    if (phase !== "countdown") return;
    if (untilStart <= 0) {
      setPhase("playing");
      return;
    }
    const t = setTimeout(() => setUntilStart((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, untilStart]);

  const MAX_HP = useMemo(() => {
    if (level === "easy") return 8;
    if (level === "hard") return 5;
    return 6;
  }, [level]);

  const [wrong, setWrong] = useState(0);
  useEffect(() => {
    setWrong(0);
  }, [MAX_HP, cardCount, level]);

  const hearts = Math.max(0, MAX_HP - wrong);

  useEffect(() => {
    if (hearts <= 0 && phase === "playing") {
      setPhase("done");
      setDoneType("fail");
    }
  }, [hearts, phase]);

  const pairLeftRef = React.useRef(cardCount);
  useEffect(() => {
    pairLeftRef.current = cardCount;
  }, [cardCount]);

  const [trayH, setTrayH] = useState(0);

  const handleRetty = () => {
    setDoneType(null);
    setWrong(0);
    setMatchedFruits(new Set());
    pairLeftRef.current = cardCount;
    setSeed((s) => s + 1);
    setPhase("countdown");
    setUntilStart(3);
  };

  const handleBack = () => {
    router.back();
  };

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
        <PlayHeader title={`${labelFromLevel(level)} 난이도`} hearts={hearts} />

        <View style={{ height: 10 }} />

        <MemoryBoard
          items={deck}
          disabled={phase !== "playing" || !!doneType}
          // 틀렸을 때: HP 1 감소
          revealAll={phase === "countdown"}
          onMismatch={() => setWrong((w) => w + 1)}
          // 맞춘 쌍 완료(선택): 모두 맞추면 종료(성공)
          onPairMatched={(fruit: FruitKey) => {
            setMatchedFruits((prev) => {
              const next = new Set(prev);
              next.add(fruit);
              return next;
            });
            const next = Math.max(0, pairLeftRef.current - 1);
            pairLeftRef.current = next;
            if (next === 0) {
              setPhase("done");
              setDoneType("success");
            }
          }}
        />
      </ScrollView>

      <View style={s.trayWrap} pointerEvents="box-none">
        <View
          onLayout={(e) => setTrayH(e.nativeEvent.layout.height)}
          pointerEvents="box-none"
        >
          <BottomTray
            fruits={base}
            matched={matchedFruits}
            style={{ marginTop: 0 }}
          />
        </View>

        <View
          style={[s.bottomPad, { height: insets.bottom }]}
          pointerEvents="none"
        />
      </View>
      <ResultOverlay
        visible={!!doneType}
        success={doneType === "success"}
        onRetry={handleRetty}
        onBack={handleBack}
      />
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
  bottomOnly: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
  },
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
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  countWrap: { alignItems: "center", gap: 12 },
  countBadge: {
    minWidth: 160,
    minHeight: 160,
    borderRadius: 999,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  countText: {
    fontSize: 72,
    fontWeight: "800",
  },
});
