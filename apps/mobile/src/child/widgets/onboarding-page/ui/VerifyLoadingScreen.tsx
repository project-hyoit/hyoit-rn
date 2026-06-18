import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import ProgressBar from "../../../../ui/ProgressBar";
import { useOnboardingStore } from "@/src/parent/entities/auth/model/onboarding.store";
import { IconSymbol } from "@/src/shared/ui";

interface VerifyLoadingScreenProps {
  codeInput: string;
}

export default function VerifyLoadingScreen({ codeInput }: VerifyLoadingScreenProps) {
  const correctCode = "927582"; // 부모가 발송한 코드
  const setStore = useOnboardingStore((s) => s.set);

  useEffect(() => {
    setStore({ step: 3 });
  }, [setStore]);

  useEffect(() => {
    // 부모 코드 검증 시간 시뮬레이션 (2초)
    const timer = setTimeout(() => {
      if (codeInput === correctCode) {
        router.replace("/(child)/onboarding/success");
      } else {
        router.replace("/(child)/onboarding/fail");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [codeInput]);
  const rotate = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 1400,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, [rotate, pulse]);

  const spin = rotate.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });
  const scale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.18] });

  return (
    <View style={s.wrap}>
      <ProgressBar current={3} total={4} />
      <Text style={s.title} allowFontScaling={false}>
        부모님 정보를 확인하고{"\n"}있어요
      </Text>

      <View style={s.loadingContainer}>
        <Animated.View style={[s.ring, { transform: [{ rotate: spin }] }]} />
      </View>

      <View style={s.messageBox}>
        <View style={s.messageIconWrap}>
          <IconSymbol name="checkmark" size={18} color="#1E90FF" />
        </View>
        <Text style={s.message} allowFontScaling={false}>
          입력한 인증번호를 확인 중이에요.
        </Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    lineHeight: 36,
    color: "#000000",
    fontWeight: "600",
    marginBottom: 60,
    textAlign: "center",
  },
  loadingContainer: {
    marginVertical: 40,
    justifyContent: "center",
    alignItems: "center",
    height: 140,
  },
  ring: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: "rgba(30,144,255,0.15)",
    borderTopColor: "#1E90FF",
    marginBottom: 12,
  },

  messageBox: {
    backgroundColor: "#F0F6FF",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 40,
  },
  messageIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1E90FF",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  message: {
    fontSize: 14,
    color: "#434343",
    fontWeight: "500",
    flex: 1,
  },
});
