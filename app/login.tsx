import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Login() {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={styles.safe}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <View style={styles.container}>
        <View style={styles.brand}>
          <View style={styles.brandRow}>
            <Text style={styles.logoText} allowFontScaling={false}>
              효잇
            </Text>
            <Image source={require("@/assets/images/Vector.png")} />
          </View>
        </View>

        <View style={[styles.actions, { paddingBottom: bottom + 40 }]}>
          <Pressable
            onPress={() => router.push("/onboarding/user-info")}
            android_ripple={{ color: "rgba(0,0,0,0.06)" }}
            style={({ pressed }) => [
              styles.kakaoBtn,
              pressed && styles.kakaoPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="카카오 계정으로 간편 로그인"
            hitSlop={8}
          >
            <Image
              source={require("@/assets/images/kakao_icon.png")}
              style={styles.kakaoIcon}
            />
            <Text style={styles.kakaoLabel} allowFontScaling={false}>
              카카오 계정으로 간편 로그인
            </Text>
          </Pressable>

          <Text style={styles.caption} allowFontScaling={false}>
            *카카오 계정으로만 로그인이 가능합니다
          </Text>
        </View>
      </View>
    </View>
  );
}

const COLORS = {
  bg: "#FFFFFF",
  card: "#F8F8F8",
  text: "#000000",
  subText: "#B6B6B6",
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
  brand: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoText: {
    fontSize: 48,
    fontWeight: "600",
    color: COLORS.text,
    lineHeight: 56,
  },

  actions: {
    width: "100%",
    alignItems: "center",
    gap: 12,
  },
  kakaoBtn: {
    alignSelf: "stretch",
    backgroundColor: COLORS.card,
    borderRadius: 16,
    minHeight: 56,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
      },
    }),
  },
  kakaoPressed: { opacity: 0.9 },
  kakaoIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    fontWeight: "800",
  },
  kakaoLabel: {
    fontSize: 18,
    color: COLORS.text,
  },
  caption: {
    color: COLORS.subText,
    fontSize: 14,
    textAlign: "center",
    marginTop: 6,
  },
});
