import { FruitKey, fruitSrc } from "@/shared/assets/fruits";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import MemoryTile from "../MemoryTile";

type Props = {
  items: FruitKey[];
  cols?: number;
  disabled?: boolean;
  onPairMatched?: () => void;
  onMismatch?: () => void;
  onComplete?: () => void;
  revealAll?: boolean;
};

const GAP = 16;
const HPAD = 24;
const FLIP_DURATION = 220;

export default function MemoryBoard({
  items,
  cols = 4,
  disabled,
  onPairMatched,
  onMismatch,
  onComplete,
  revealAll = false,
}: Props) {
  const { width } = useWindowDimensions();

  // tile size
  const tile = useMemo(() => {
    const usable = width - HPAD * 2 - GAP * (cols - 1);
    return Math.floor(usable / cols);
  }, [width, cols]);

  // state
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [lock, setLock] = useState(false);
  const [bulkFlipping, setBulkFlipping] = useState(false);

  // per-card animated value (0=back, 1=front)
  const flipsRef = useRef<Animated.Value[]>([]);
  if (flipsRef.current.length !== items.length) {
    flipsRef.current = items.map(() => new Animated.Value(revealAll ? 1 : 0));
  }

  // reset on new deck (only when items changes)
  useEffect(() => {
    setOpen([]);
    setMatched(new Set());
    setLock(false);
    flipsRef.current = items.map(() => new Animated.Value(revealAll ? 1 : 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  // revealAll toggle → bulk flip
  useEffect(() => {
    setBulkFlipping(true);
    Animated.stagger(
      8,
      flipsRef.current.map((v) =>
        Animated.timing(v, {
          toValue: revealAll ? 1 : 0,
          duration: FLIP_DURATION,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        })
      )
    ).start(() => setBulkFlipping(false));
  }, [revealAll]);

  // complete
  useEffect(() => {
    if (matched.size === items.length && items.length > 0) onComplete?.();
  }, [matched, items.length, onComplete]);

  // helpers
  const flipTo = (i: number, to: 0 | 1) => {
    if (matched.has(i))
      return Animated.timing(new Animated.Value(0), {
        // no-op
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      });
    const v = flipsRef.current[i];
    v.stopAnimation(); // cancel queued anim
    return Animated.timing(v, {
      toValue: to,
      duration: FLIP_DURATION,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });
  };

  const handlePress = (i: number) => {
    if (disabled || lock || bulkFlipping || revealAll) return;
    if (matched.has(i)) return;
    if (open.includes(i)) return;

    if (open.length === 0) {
      // 먼저 open에 넣어 두어 연타 차단
      setOpen([i]);
      flipTo(i, 1).start();
      return;
    }

    if (open.length === 1) {
      const first = open[0];
      const second = i;

      // 페어 판정 완료 전까지 입력 금지
      setLock(true);

      flipTo(second, 1).start(() => {
        const same = items[first] === items[second];

        if (same) {
          setMatched((prev) => {
            const nx = new Set(prev);
            nx.add(first);
            nx.add(second);
            return nx;
          });
          setOpen([]);
          setLock(false);
          onPairMatched?.();
        } else {
          setTimeout(() => {
            // 혹시 그 사이 매칭되었으면 뒤집지 않음
            const anims: Animated.CompositeAnimation[] = [];
            if (!matched.has(first)) anims.push(flipTo(first, 0));
            if (!matched.has(second)) anims.push(flipTo(second, 0));
            Animated.parallel(anims).start(() => {
              setOpen([]);
              setLock(false);
              onMismatch?.();
            });
          }, 600);
        }
      });
      return;
    }
  };

  // layout helpers
  const rows = Math.ceil(items.length / cols);
  const lastRowStart = (rows - 1) * cols;

  return (
    <View style={{ paddingHorizontal: HPAD, paddingTop: 6 }}>
      <View style={styles.wrap}>
        {items.map((key, i) => {
          const mr = i % cols !== cols - 1 ? GAP : 0;
          const mb = i < lastRowStart ? GAP : 0;

          const prog = flipsRef.current[i];
          const frontRotateY = prog.interpolate({
            inputRange: [0, 1],
            outputRange: ["180deg", "0deg"],
          });
          const backRotateY = prog.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "-180deg"],
          });

          const frontOpacity = prog.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0.2, 1],
            extrapolate: "clamp",
          });
          const backOpacity = prog.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 0.8, 0],
            extrapolate: "clamp",
          });

          return (
            <Pressable
              key={`${key}-${i}-${matched.has(i) ? "m" : "n"}`}
              disabled={disabled || lock || bulkFlipping || revealAll}
              onPress={() => handlePress(i)}
              style={{ marginRight: mr, marginBottom: mb }}
            >
              <View
                style={[
                  styles.card,
                  { width: tile, height: tile, borderRadius: 12 },
                ]}
              >
                {/* back */}
                <Animated.View
                  renderToHardwareTextureAndroid
                  style={[
                    styles.face,
                    {
                      opacity: backOpacity,
                      transform: [
                        { perspective: 800 },
                        { rotateY: backRotateY },
                      ],
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.backInner,
                      { width: tile * 0.8, height: tile * 0.8 },
                    ]}
                  />
                </Animated.View>

                {/* front */}
                <Animated.View
                  renderToHardwareTextureAndroid
                  style={[
                    styles.face,
                    {
                      opacity: frontOpacity,
                      transform: [
                        { perspective: 800 },
                        { rotateY: frontRotateY },
                      ],
                    },
                  ]}
                >
                  <MemoryTile size={tile} source={fruitSrc[key]} />
                </Animated.View>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: "row", flexWrap: "wrap" },
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
    overflow: "hidden",
  },
  face: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
  },
  backInner: {
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
  },
});
