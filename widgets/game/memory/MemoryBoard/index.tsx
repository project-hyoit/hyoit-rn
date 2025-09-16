// MemoryBoard.tsx
import { FruitKey, fruitSrc } from "@/shared/assets/fruits";
import React, { useEffect, useMemo, useState } from "react";
import { View, useWindowDimensions } from "react-native";
import MemoryTile from "../MemoryTile";
type Props = {
  items: FruitKey[];
  disabled?: boolean;
  onPairMatched?: () => void;
  onMismatch?: () => void;
  onComplete?: () => void;
  cols?: number;
  /** 프리뷰(전체 공개) 모드일 때 true */
  revealAll?: boolean;
};

const DEFAULT_COLS = 4;
const GAP = 16;
const HPAD = 24;

export default function MemoryBoard({
  items,
  disabled,
  onPairMatched,
  onMismatch,
  onComplete,
  cols = DEFAULT_COLS,
  revealAll = false,
}: Props) {
  const { width } = useWindowDimensions();

  const tile = useMemo(() => {
    const usable = width - HPAD * 2 - GAP * (cols - 1);
    return Math.floor(usable / cols);
  }, [width, cols]);

  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [lock, setLock] = useState(false);

  useEffect(() => {
    setOpen([]);
    setMatched(new Set());
    setLock(false);
  }, [items]);

  useEffect(() => {
    if (matched.size === items.length && items.length > 0) {
      onComplete?.();
    }
  }, [matched, items.length, onComplete]);

  const handlePress = (i: number) => {
    if (disabled || lock || revealAll) return; // 프리뷰 중엔 터치 막기
    if (matched.has(i)) return;
    if (open.includes(i)) return;

    if (open.length === 0) {
      setOpen([i]);
      return;
    }

    if (open.length === 1) {
      const first = open[0];
      const second = i;
      const isSame = items[first] === items[second];

      setOpen([first, second]);

      if (isSame) {
        setMatched((prev) => {
          const nx = new Set(prev);
          nx.add(first);
          nx.add(second);
          return nx;
        });
        setOpen([]);
        onPairMatched?.();
      } else {
        setLock(true);
        setTimeout(() => {
          setOpen([]);
          setLock(false);
        }, 600);
        onMismatch?.();
      }
      return;
    }

    setOpen([i]);
  };

  const rows = Math.ceil(items.length / cols);
  const lastRowStart = (rows - 1) * cols;

  return (
    <View style={{ paddingHorizontal: HPAD, paddingTop: 6 }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {items.map((key, i) => {
          const isOpen = open.includes(i);
          const isMatched = matched.has(i);
          const isRevealed = revealAll || isOpen || isMatched; // ← 핵심
          const mr = i % cols !== cols - 1 ? GAP : 0;
          const mb = i < lastRowStart ? GAP : 0;

          return (
            <View
              key={`${key}-${i}-${isMatched ? "m" : "n"}`}
              style={{ marginRight: mr, marginBottom: mb }}
            >
              <MemoryTile
                size={tile}
                source={fruitSrc[key]}
                revealed={isRevealed}
                matched={isMatched}
                disabled={disabled || lock || revealAll}
                onPress={() => handlePress(i)}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
}
