import { router } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";

export default function VerifyCodeScreen() {
  // 6자리 인증코드 입력 상태
  const [codeInputs, setCodeInputs] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(TextInput | null)[]>([null, null, null, null, null, null]);

  const handleCodeInput = useCallback((text: string, index: number) => {
    // 숫자만 허용하고 1자리만 입력
    const digit = text.replace(/[^0-9]/g, "").slice(0, 1);
    const newInputs = [...codeInputs];
    newInputs[index] = digit;
    setCodeInputs(newInputs);

    // 숫자 입력 시 다음 필드로 자동 이동
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }, [codeInputs]);

  const handleVerifyCode = useCallback(() => {
    const fullCode = codeInputs.join("");
    if (fullCode.length !== 6) {
      router.replace("/(child)/onboarding/fail");
      return;
    }
    // 로딩 페이지로 이동하여 코드 검증
    router.push({
      pathname: "/(child)/onboarding/verify-loading",
      params: { codeInput: fullCode },
    });
  }, [codeInputs]);

  const handleCodeBackspace = useCallback((index: number) => {
    const newInputs = [...codeInputs];
    if (!newInputs[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    newInputs[index] = "";
    setCodeInputs(newInputs);
  }, [codeInputs]);

  return (
    <View style={s.wrap}>
      <Text style={s.title} allowFontScaling={false}>
        가족구성원 추가를 위한{"\n"}인증번호가 생성되었어요
      </Text>

      <View style={s.myCodeCard}>
        <Text style={s.myCodeLabel} allowFontScaling={false}>
          인증 번호 입력
        </Text>
        <View style={s.codeInputRow}>
          {codeInputs.map((val, idx) => (
            <TextInput
              key={idx}
              ref={(ref) => {
                inputRefs.current[idx] = ref;
              }}
              style={s.codeInput}
              value={val}
              onChangeText={(text) => handleCodeInput(text, idx)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  handleCodeBackspace(idx);
                }
              }}
              keyboardType="number-pad"
              maxLength={1}
              selectionColor="#1E90FF"
              allowFontScaling={false}
              caretHidden={true}
            />
          ))}
        </View>
        <Text style={s.explanation}>부모님 핸드폰을 통해 인증번호를 입력해주세요</Text>
      </View>

      <View style={s.nextRow}>
        <Pressable
          style={({ pressed }) => [s.next, pressed && { opacity: 0.9 }]}
          onPress={handleVerifyCode}
          hitSlop={8}
        >
          <Text style={s.nextText}>확인</Text>
        </Pressable>
      </View>
    </View>
  );
}

const COLORS = {
  bg: "#FFFFFF",
  text: "#000000",
  label: "#454545",
  border: "#B6B6B6",
  card: "#F5F5F5",
  primary: "#1E90FF",
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
    marginBottom: 60,
  },
  myCodeCard: {
    alignItems: "center",
    marginBottom: 20,
    gap: 20,
  },
  myCodeLabel: { fontSize: 16, color: COLORS.text, fontWeight: "600" },
  codeInputRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 5,
    justifyContent: "center",
  },
  codeInput: {
    width: 50,
    height: 56,
    backgroundColor: "#E9E9E9",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.text,
  },
  explanation: {
    fontSize: 14,
    fontWeight: "500",
  },
  modalButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  recertification: {
    backgroundColor:"#1E8FFF",
    marginTop: "auto",
    marginBottom: 58,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius:14,
  },
  recertificationText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center", 
  },
  bottomSheet: {
    width: 364,
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
  },
  sheetTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 16,
  },
  userCard: {
    backgroundColor:"#F5F5F5",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 36,
    justifyContent: "space-between",
    flexDirection: "row", 
    alignItems: "center",
  },
  surnameCircle:{
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#BCE1FF",
    alignItems: "center",
    justifyContent: "center",
  },
  surnameText:{
    fontSize:20,
    fontWeight:"600",
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    marginLeft: -24,
  },
  phone: {
    fontSize: 16,
    fontWeight: "500",
    color: "#434343",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancel: {
    color: "#262626",
    fontSize: 20,
    fontWeight: "500",
  },
  cancelButton: {
    paddingVertical:10,
    paddingHorizontal:48,
    backgroundColor:"#F5F5F5",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  ok: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "500",
  },
  okButton: {
    paddingVertical:10,
    paddingHorizontal:48,
    backgroundColor: "#1E90FF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  timerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  timerText: {
    fontSize: 14,
    color: "rgba(0,0,0,0.6)",
  },
  resendSmall: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "600",
  },
  nextRow: {
    marginTop: "auto",
    alignItems: "flex-end",
    marginBottom: 64,
  },
  next: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 15,
    width: "100%",
  },
  nextText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "500",
  },
});
