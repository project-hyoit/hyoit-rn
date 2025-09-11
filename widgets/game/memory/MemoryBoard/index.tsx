import { FruitKey, fruitSrc } from "@/shared/assets/fruits";
import React, { useMemo } from "react";
import { View, useWindowDimensions } from "react-native";
import MemoryTile from "../MemoryTitle";

type Props = {
  items: FruitKey[];
  disabled?: boolean;
};

const COLS = 4;
const GAP = 16;
const HPAD = 24;

export default function MemoryBoard({ items, disabled }: Props) {
  const { width } = useWindowDimensions();
  const tile = useMemo(() => {
    const usable = width - HPAD * 2 - GAP * (COLS - 1);
    return Math.floor(usable / COLS);
  }, [width]);

  return (
    <View style={{ paddingHorizontal: HPAD, paddingTop: 6 }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {items.map((key, i) => {
          const mr = i % COLS !== COLS - 1 ? GAP : 0;
          const mb = i < items.length - COLS ? GAP : 0;
          return (
            <View
              key={`${key}-${i}`}
              style={{ marginRight: mr, marginBottom: mb }}
            >
              <MemoryTile
                size={tile}
                source={fruitSrc[key]}
                disabled={disabled}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
}
