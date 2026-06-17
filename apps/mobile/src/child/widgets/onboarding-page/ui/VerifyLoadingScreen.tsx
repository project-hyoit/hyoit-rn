import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

interface VerifyLoadingScreenProps {
  codeInput: string;
}

export default function VerifyLoadingScreen({ codeInput }: VerifyLoadingScreenProps) {
  const correctCode = "927582"; // 부모가 발송한 코드

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

  return (
    <View style={s.wrap}>
      <Text style={s.title} allowFontScaling={false}>
        부모님 정보를 확인하고{"\n"}있어요
      </Text>

      <View style={s.loadingContainer}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>

      <View style={s.messageBox}>
        <Text style={s.checkmark}>✓</Text>
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
  checkmark: {
    fontSize: 24,
    color: "#1E90FF",
    fontWeight: "600",
  },
  message: {
    fontSize: 14,
    color: "#434343",
    fontWeight: "500",
    flex: 1,
  },
});
