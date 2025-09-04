import { useOnboardingStore } from "@/entities/auth/model/onboarding.store";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function UserInfo() {
  const { name, age, phone, set } = useOnboardingStore();
  const canNext = name.trim() && age.trim() && phone.trim();

  return (
    <View style={s.wrap}>
      <Text style={s.title}>효잇을 사용하기 위한\n기본 정보를 알려주세요</Text>

      <TextInput
        placeholder="이름을 입력해주세요"
        value={name}
        onChangeText={(v) => set({ name: v })}
        style={s.input}
      />
      <TextInput
        placeholder="나이를 입력해주세요"
        keyboardType="number-pad"
        value={age}
        onChangeText={(v) => set({ age: v })}
        style={s.input}
      />
      <TextInput
        placeholder="전화번호를 입력해주세요"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={(v) => set({ phone: v })}
        style={s.input}
      />

      <Pressable
        style={[s.next, !canNext && { opacity: 0.4 }]}
        disabled={!canNext}
        onPress={() => router.push("/onboarding/verify-code")} // 인증 단계 스킵하려면 success로
      >
        <Text style={s.nextText}>다음 →</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, padding: 20, gap: 12, paddingTop: 60 },
  title: { fontSize: 20, lineHeight: 28, marginBottom: 8, fontWeight: "700" },
  input: {
    borderWidth: 1,
    borderColor: "#E3E5E8",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
  },
  next: {
    marginTop: 8,
    backgroundColor: "#2F80ED",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  nextText: { color: "#fff", fontWeight: "700" },
});
