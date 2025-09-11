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
  const { level, secs } = useLocalSearchParams<{
    level?: string;
    secs?: string;
  }>();
  const insets = useSafeAreaInsets();

  const [untilStart, setUntilStart] = useState(5);
  useEffect(() => {
    if (untilStart <= 0) return;
    const t = setTimeout(() => setUntilStart((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [untilStart]);

  const [wrong, setWrong] = useState(0);

  const [trayH, setTrayH] = useState(0);

  const deck = useMemo(() => {
    const base = FRUITS.slice(0, 8);
    const pairs: FruitKey[] = [...base, ...base];
    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }
    return pairs;
  }, []);

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
        <PlayHeader
          title={`${labelFromLevel(level)} 난이도`}
          untilStart={untilStart}
          wrong={wrong}
        />

        <View style={{ height: 10 }} />

        <MemoryBoard items={deck} disabled={untilStart > 0} />
      </ScrollView>

      <View style={s.trayWrap} pointerEvents="box-none">
        <View
          onLayout={(e) => setTrayH(e.nativeEvent.layout.height)}
          pointerEvents="box-none"
        >
          <BottomTray remaining={FRUITS} style={{ marginTop: 0 }} />
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
});
