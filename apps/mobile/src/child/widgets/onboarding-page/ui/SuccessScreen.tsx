import { useAuthStore } from "@hyoit/auth";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import ProgressBar from "../../../../ui/ProgressBar";
import { useEffect } from "react";
import { useOnboardingStore } from "@/src/parent/entities/auth/model/onboarding.store";

export default function SuccessScreen() {
  const { setChildOnboarded } = useAuthStore();
  const setStore = useOnboardingStore((s) => s.set);
  useEffect(() => {
    setStore({ step: 4 });
  }, [setStore]);

  return (
    <View style={s.wrap}>
      <ProgressBar current={4} total={4} />
      <View style={s.content}>
        <View style={s.imageContainer}>
          <Image
            source={require("@/assets/images/success-sticker.png")}
            style={s.image}
          />
        </View>

        <Text style={s.title} allowFontScaling={false}>
          연결 완료!
        </Text>

        <Text style={s.description} allowFontScaling={false}>
          이제 부모님께서{"\n"}당신을 보호할 준비가 되었어요.
        </Text>
      </View>

      <Pressable
        style={s.button}
        onPress={() => {
          setChildOnboarded(true);
          router.replace("/(child)");
        }}
      >
        <Text style={s.buttonText} allowFontScaling={false}>
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
    paddingVertical: 40,
    justifyContent: "space-between",
  },
  content: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  imageContainer: {
    marginBottom: 60,
  },
  image: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 12,
  },
  description: {
    fontSize: 18,
    fontWeight: "500",
    color: "#454545",
    textAlign: "center",
    lineHeight: 28,
  },
  button: {
    backgroundColor: "#1E90FF",
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
  },
});
