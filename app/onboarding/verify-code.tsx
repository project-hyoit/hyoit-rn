import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function VerifyCode() {
  return (
    <View style={s.wrap}>
      <Text style={s.title}>
        가족구성원 추가를 위한{"\n"}인증번호가 생성되었어요
      </Text>

      <View style={s.codeBox}>
        <Text style={s.code}>927582</Text>
      </View>

      <Pressable
        style={s.next}
        onPress={() => router.replace("/(tabs)")} // ✅ 홈 탭으로 교체 이동
      >
        <Text style={s.nextText}>다음 →</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, padding: 20, gap: 12, paddingTop: 60 },
  title: { fontSize: 20, fontWeight: "700" },
  codeBox: {
    backgroundColor: "#F7F8FA",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginVertical: 8,
  },
  code: { fontSize: 32, fontWeight: "800", letterSpacing: 2 },
  next: {
    backgroundColor: "#2F80ED",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  nextText: { color: "#fff", fontWeight: "700" },
});
