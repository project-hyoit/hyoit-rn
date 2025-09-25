import { SymbolView } from "expo-symbols";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  success: boolean;
  onRetry: () => void;
  onBack: () => void;
};

const ART: Record<"success" | "fail", ImageSourcePropType> = {
  success: require("@/assets/images/success-sticker.png"),
  fail: require("@/assets/images/fail-sticker.png"),
};

export default function ResultOverlay({
  visible,
  success,
  onRetry,
  onBack,
}: Props) {
  const scale = useRef(new Animated.Value(0.9)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const badgeScale = useRef(new Animated.Value(0.7)).current;
  const badgeBounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 160,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          bounciness: 12,
          speed: 12,
          useNativeDriver: true,
        }),
        Animated.spring(badgeScale, {
          toValue: 1,
          bounciness: 14,
          speed: 12,
          useNativeDriver: true,
        }),
        Animated.timing(badgeBounce, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.9,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(badgeScale, {
          toValue: 0.7,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(badgeBounce, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, opacity, scale, badgeScale, badgeBounce]);

  if (!visible) return null;

  const badgeTranslateY = badgeBounce.interpolate({
    inputRange: [0, 1],
    outputRange: [-8, -12],
  });

  return (
    <View style={s.backdrop} pointerEvents="auto">
      {/* 배지: 카드 위 */}
      <View style={s.overlayCenter}>
        <Animated.Image
          source={success ? ART.success : ART.fail}
          style={[
            s.badgeImage,
            {
              transform: [
                { scale: badgeScale },
                { translateY: badgeTranslateY },
              ],
            },
          ]}
          resizeMode="contain"
        />
      </View>

      <Animated.View style={[s.card, { opacity, transform: [{ scale }] }]}>
        <View style={s.actions}>
          {/* 돌아가기 */}
          <Pressable
            onPress={onBack}
            style={({ pressed }) => [s.btn, pressed && s.btnPressed]}
            android_ripple={{ color: "#eef2ff" }}
          >
            <View style={s.btnInner}>
              <SymbolView name="house.fill" tintColor="#111" size={28} />
              <Text style={s.btnLabel}>돌아가기</Text>
            </View>
          </Pressable>

          {/* 다시하기 */}
          <Pressable
            onPress={onRetry}
            style={({ pressed }) => [s.btn, pressed && s.btnPressed]}
            android_ripple={{ color: "#eef2ff" }}
          >
            <View style={s.btnInner}>
              <SymbolView
                name="arrow.counterclockwise"
                tintColor="#111"
                size={28}
              />

              <Text style={s.btnLabel}>다시하기</Text>
            </View>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
}

const s = StyleSheet.create({
  backdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
  },
  overlayCenter: {
    width: "84%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  card: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 18,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
    zIndex: 10,
  },
  badgeImage: {
    position: "absolute",
    top: -140,
    width: 180,
    height: 180,
    zIndex: 30,
    elevation: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    gap: 12,
  },
  btn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  btnPressed: { opacity: 0.9 },
  btnInner: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  btnLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#8E8E93",
  },
});
