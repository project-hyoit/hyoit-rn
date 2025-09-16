import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

type Props = {
  size: number;
  source: ImageSourcePropType;
  revealed: boolean;
  matched?: boolean;
  disabled?: boolean;
  onPress?: () => void;
};

export default function MemoryTile({
  size,
  source,
  revealed,
  matched,
  disabled,
  onPress,
}: Props) {
  // 0(뒷면) ↔ 1(앞면)
  const prog = useRef(new Animated.Value(revealed ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(prog, {
      toValue: revealed ? 1 : 0,
      duration: 180,
      useNativeDriver: true, // opacity만 애니메이션 -> OK
    }).start();
  }, [revealed]);

  const frontOpacity = prog; // 0 → 1
  const backOpacity = prog.interpolate({
    // 1 → 0
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      hitSlop={6}
      style={({ pressed }) => [
        s.box,
        { width: size, height: size, borderRadius: 12 },
        pressed && !disabled && { opacity: 0.92 },
      ]}
    >
      {/* 뒷면 */}
      <Animated.View style={[s.face, { opacity: backOpacity }]}>
        <View
          style={[s.backInner, { width: size * 0.6, height: size * 0.6 }]}
        />
      </Animated.View>

      {/* 앞면 */}
      <Animated.View style={[s.face, { opacity: frontOpacity }]}>
        <Image source={source} style={s.img} resizeMode="contain" />
      </Animated.View>

      {/* 맞춘 카드면 살짝 dim */}
      {matched && <View pointerEvents="none" style={s.matchedOverlay} />}
    </Pressable>
  );
}

const s = StyleSheet.create({
  box: {
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
  },
  backInner: {
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
  },
  img: { width: "72%", height: "72%" },
  matchedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.06)",
  },
});
