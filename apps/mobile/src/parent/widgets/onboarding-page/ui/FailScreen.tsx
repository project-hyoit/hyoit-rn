import { useAuthStore } from "@hyoit/auth";
import { router } from "expo-router";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import ProgressBar from "../../../../ui/ProgressBar";
import { useEffect } from "react";
import { useOnboardingStore } from "@/src/parent/entities/auth/model/onboarding.store";

export default function FailScreen() {
  const setParentOnboarded = useAuthStore((s) => s.setParentOnboarded);
  const setStore = useOnboardingStore((s) => s.set);

  useEffect(() => {
    setStore({ step: 4 });
  }, [setStore]);

  return (
    <View style={s.wrap}>
      <ProgressBar current={4} total={4} />
      <Text style={s.title} allowFontScaling={false}>
        연결에 실패했어요
      </Text>

      <Text style={s.description} allowFontScaling={false}>
        입력한 연결번호를 다시 확인한 뒤{"\n"}한번 더 시도해주세요.
      </Text>

      <Pressable
        onPress={() => {
          setParentOnboarded(false);
          router.replace("/(parent)");
        }}
        style={({ pressed }) => [s.primaryBtn, pressed && { opacity: 0.9 }]}
      >
        <Text style={s.primaryText} allowFontScaling={false}>
          다시 시작하기
        </Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 146,
  },
  title: {
    fontSize: 27,
    lineHeight: 32,
    color: "#000000",
    fontWeight: "600",
    marginBottom: 9,
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 25,
    fontWeight: "600",
  },
  primaryBtn: {
    marginTop: "auto",
    marginBottom: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: "#1E90FF",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 2 },
    }),
  },
  primaryText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
});
