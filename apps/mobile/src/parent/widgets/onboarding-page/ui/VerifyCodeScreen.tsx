import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import ConfirmChildModal from "./ConfirmChildModal";

export default function VerifyCodeScreen() {
  const myCode = "927582";
  const [showConfirm, setShowConfirm] = useState(false);

  const openModal = () => {
    setShowConfirm(true);
  };

  const closeModal = () => {
    setShowConfirm(false);
  };

  const confirmChild = () => {
    router.push("/(parent)/onboarding/success");
  };

  return (
    <View style={s.wrap}>
      <Text style={s.title} allowFontScaling={false}>
        가족구성원 추가를 위한{"\n"}인증번호가 생성되었어요
      </Text>

      <View style={s.myCodeCard}>
        <Text style={s.myCodeLabel} allowFontScaling={false}>
          내 인증 번호
        </Text>

        <Text style={s.myCodeText} allowFontScaling={false}>
          {myCode}
        </Text>

        <Text style={s.explanation}>
          자녀분 핸드폰을 통해 인증번호를 입력해주세요
        </Text>
      </View>

      <View style={s.modalButtonRow}>
        <Pressable onPress={openModal} style={s.modalButton}>
          <Text style={s.modalButtonText}>모달 확인</Text>
        </Pressable>
      </View>

      <Pressable style={s.recertification}>
        <Text style={s.recertificationText}>인증번호 다시 받기</Text>
      </Pressable>

      <ConfirmChildModal
        visible={showConfirm}
        onClose={closeModal}
        onConfirm={confirmChild}
      />
    </View>
  );
}

const COLORS = {
  bg: "#FFFFFF",
  text: "#000000",
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
  myCodeLabel: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: "600",
  },
  myCodeText: {
    fontSize: 32,
    lineHeight: 40,
    color: COLORS.text,
    fontWeight: "800",
    letterSpacing: 2,
    marginTop: 4,
  },
  explanation: {
    fontSize: 14,
    fontWeight: "600",
  },
  modalButtonRow: {
    marginTop: 12,
    alignItems: "flex-end",
  },
  modalButton: {
    backgroundColor: "#000000",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  recertification: {
    backgroundColor: COLORS.primary,
    marginTop: "auto",
    marginBottom: 58,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
  },
  recertificationText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
