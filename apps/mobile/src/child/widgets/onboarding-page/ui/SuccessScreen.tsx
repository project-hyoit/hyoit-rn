import { useAuthStore } from "@hyoit/auth";
import { router } from "expo-router";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import ProgressBar from "../../../../ui/ProgressBar";
import { useEffect } from "react";
import { useOnboardingStore } from "@/src/parent/entities/auth/model/onboarding.store";
import { IconSymbol } from "@/src/shared/ui";

export default function SuccessScreen() {
  const { setChildOnboarded } = useAuthStore();
  const setStore = useOnboardingStore((s) => s.set);

  useEffect(() => {
    setStore({ step: 4 });
  }, [setStore]);

  return (
    <View style={s.wrap}>
      <ProgressBar current={4} total={4} />
      <Text style={s.title} allowFontScaling={false}>
        연결 완료!
      </Text>

      <Text style={s.description} allowFontScaling={false}>
        이제 부모님께서{`
`}당신을 보호할 준비가 되었어요.
      </Text>

      <View style={s.iconWrap}>
        <IconSymbol name="checkmark" size={68} color="#FFFFFF" style={s.icon} />
      </View>

      <View style={s.infoContainer}>
        <Text style={s.infoTitle}>확인 내용</Text>
        <Text style={s.infoSubtitle}>연결이 완료되었어요</Text>
        <Text style={s.infoDescription}>지금 바로 홈으로 이동해서 부모님과 소통을 시작해보세요.</Text>
      </View>

      <View style={s.warningContainer}>
        <View style={s.warningIconSuccess}>
          <IconSymbol name="checkmark" size={20} color="#FFFFFF" />
        </View>
        <Text style={s.warningText}>시작하기 버튼을 눌러 자녀 홈으로 이동하세요.</Text>
      </View>

      <Pressable
        onPress={() => {
          setChildOnboarded(true);
          router.replace("/(child)");
        }}
        style={({ pressed }) => [s.primaryBtn, pressed && { opacity: 0.9 }]}
      >
        <Text style={s.primaryText} allowFontScaling={false}>
          시작하기
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
    marginBottom: 20,
  },
  iconWrap: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#1E90FF",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 56,
  },
  infoContainer: {
    marginTop: 40,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#504E51",
    marginBottom: 8,
  },
  infoSubtitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 8,
  },
  infoDescription: {
    fontSize: 14,
    color: "#504E51",
    lineHeight: 22,
    fontWeight: "600",
  },
  warningContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#E8F4FF",
    borderRadius: 12,
    marginBottom: 24,
    gap: 12,
  },
  warningIconSuccess: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#1E90FF",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#454545",
    lineHeight: 22,
  },
  icon: {
    width: 68,
    height: 68,
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
