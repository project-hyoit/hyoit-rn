import React, { useMemo } from "react";
import { View, useWindowDimensions } from "react-native";
import MemoryTile from "../MemoryTitle";

type Props = {
  items: string[]; // 이모지 16개
  disabled?: boolean;
};

const COLS = 4;
const GAP = 16;
const HPAD = 24; // 좌우 패딩

export default function MemoryBoard({ items, disabled }: Props) {
  const { width } = useWindowDimensions();
  const tile = useMemo(() => {
    const usable = width - HPAD * 2 - GAP * (COLS - 1);
    return Math.floor(usable / COLS);
  }, [width]);

  return (
    <View style={{ paddingHorizontal: HPAD, paddingTop: 6 }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {items.map((emj, i) => {
          const mr = i % COLS !== COLS - 1 ? GAP : 0;
          const mb = i < items.length - COLS ? GAP : 0;
          return (
            <View key={i} style={{ marginRight: mr, marginBottom: mb }}>
              <MemoryTile size={tile} emoji={emj} disabled={disabled} />
            </View>
          );
        })}
      </View>
    </View>
  );
}
