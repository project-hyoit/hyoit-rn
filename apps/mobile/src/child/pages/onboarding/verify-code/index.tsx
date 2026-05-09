import { router } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function VerifyCodeScreen() {
  const [childCode, setChildCode] = useState("");

  const canNext = /^\d{6}$/.test(childCode);

  const handleNext = () => {
    router.push("/(child)/onboarding/success");
  };

  return (
    <KeyboardAvoidingView
      style={s.keyboardWrap}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={s.wrap}>
          <Text style={s.title} allowFontScaling={false}>
            가족구성원 추가를 위한{"\n"}인증번호를 입력해주세요
          </Text>

          <View style={s.field}>
            <Text style={s.label}>인증번호</Text>

            <TextInput
              placeholder="부모님의 인증번호를 입력해주세요"
              placeholderTextColor="#B6B6B6"
              keyboardType="number-pad"
              maxLength={6}
              value={childCode}
              onChangeText={setChildCode}
              style={s.input}
            />
          </View>

          <View style={s.nextRow}>
            <Pressable
              style={({ pressed }) => [
                s.next,
                !canNext && s.nextDisabled,
                pressed && canNext && { opacity: 0.9 },
              ]}
              disabled={!canNext}
              onPress={handleNext}
            >
              <Text style={s.nextText}>다음</Text>
              <Text style={s.nextArrow}>→</Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const COLORS = {
  border: "#B6B6B6",
  label: "#454545",
  text: "#000000",
  primary: "#1E90FF",
  bg: "#FFFFFF",
};

const s = StyleSheet.create({
  keyboardWrap: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

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
    marginBottom: 64,
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
    backgroundColor: "#D9D9D9",
  },

  nextText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  nextArrow: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 2,
  },
});
