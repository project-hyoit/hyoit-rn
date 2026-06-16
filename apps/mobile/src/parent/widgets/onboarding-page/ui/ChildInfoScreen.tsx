import { useOnboardingStore } from "@/src/parent/entities/auth/model/onboarding.store";
import { router } from "expo-router";
import { useRef } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function ChildInfoScreen() {
  const { name, age, phone, set } = useOnboardingStore();
  const canNext = Boolean(name.trim() && age.trim() && phone.trim());

  const ageRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);

  return (
    <View style={s.wrap}>
      <Text style={s.title} allowFontScaling={false}>
        자녀분과 연결을 위해 몇 가지{"\n"}정보가 필요해요
      </Text>

      <View style={s.field}>
        <Text style={s.label} allowFontScaling={false}>
          이름
        </Text>
        <TextInput
          placeholder="이름을 입력해주세요"
          placeholderTextColor={COLORS.placeholder}
          value={name}
          onChangeText={(value) => set({ name: value })}
          style={s.input}
          returnKeyType="next"
          onSubmitEditing={() => ageRef.current?.focus()}
        />
      </View>

      <View style={s.field}>
        <Text style={s.label} allowFontScaling={false}>
          나이
        </Text>
        <TextInput
          ref={ageRef}
          placeholder="나이를 입력해주세요"
          placeholderTextColor={COLORS.placeholder}
          keyboardType="number-pad"
          value={age}
          onChangeText={(value) => set({ age: value })}
          style={s.input}
          returnKeyType="next"
          onSubmitEditing={() => phoneRef.current?.focus()}
        />
      </View>

      <View style={s.field}>
        <Text style={s.label} allowFontScaling={false}>
          전화번호
        </Text>
        <TextInput
          ref={phoneRef}
          placeholder="전화번호를 입력해주세요"
          placeholderTextColor={COLORS.placeholder}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={(value) => set({ phone: value })}
          style={s.input}
          returnKeyType="done"
        />
      </View>

      <View style={s.nextRow}>
        <Pressable
          style={({ pressed }) => [
            s.next,
            !canNext && s.nextDisabled,
            pressed && canNext && s.pressed,
          ]}
          disabled={!canNext}
          onPress={() => router.push("/(parent)/onboarding/verify-code")}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="다음"
        >
          <Text style={s.nextText} allowFontScaling={false}>
            다음
          </Text>
          <Text style={s.nextArrow} allowFontScaling={false}>
            →
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const COLORS = {
  border: "#B6B6B6",
  label: "#454545",
  text: "#000000",
  placeholder: "#B6B6B6",
  primary: "#1E90FF",
  disabled: "#D9D9D9",
  bg: "#FFFFFF",
};

const s = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 24,
    paddingTop: 120,
  },
  title: {
    fontSize: 24,
    lineHeight: 36,
    color: COLORS.text,
    fontWeight: "600",
    marginBottom: 64,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    color: COLORS.label,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 4,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: Platform.select({ ios: 14, android: 12 }),
    fontSize: 16,
    color: COLORS.text,
  },
  nextRow: {
    marginTop: "auto",
    alignItems: "flex-end",
    marginBottom: 106,
  },
  next: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
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
  nextDisabled: {
    backgroundColor: COLORS.disabled,
  },
  pressed: {
    opacity: 0.9,
  },
  nextText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  nextArrow: {
    color: "#FFFFFF",
    fontSize: 16,
    marginLeft: 2,
  },
});
