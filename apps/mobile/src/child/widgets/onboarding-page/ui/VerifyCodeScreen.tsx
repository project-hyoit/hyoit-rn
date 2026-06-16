import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function VerifyCodeScreen() {
  const myCode = "927582";
  const [showConfirm, setShowConfirm] = useState(false);

  const openModal = () => {
    setShowConfirm(true);
  };

  const closeModal = () => {
    setShowConfirm(false);
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
        <View style={s.codeRow}>
          {myCode.split("").map((num, index) => (
            <View key={index} style={s.codeBox}>
              <Text style={s.codeText} allowFontScaling={false}>
                {num}
              </Text>
            </View>
          ))}
        </View>
        <Text style={s.explanation}>부모님 핸드폰을 통해 인증번호를 입력해주세요</Text>
      </View>

      <View style={{ marginTop: 12, alignItems: "flex-end" }}>
        <Pressable onPress={openModal} style={s.modalButton}>
          <Text style={s.modalButtonText}>모달 확인</Text>
        </Pressable>
      </View>

      <View style={s.recertification}>
        <Text style={s.recertificationText}>인증번호 다시 받기</Text>
      </View>

      {showConfirm && (
        <View style={s.overlay}>
          <Pressable 
            style={StyleSheet.absoluteFill} 
            onPress={closeModal} 
          />
          <View style={s.bottomSheet}>
            <Text style={s.sheetTitle}>부모님이 맞으신가요?</Text>
            <View style={s.userCard}>
              <View style={s.surnameCircle}>
                <Text style={s.surnameText}>김</Text>
              </View>
              <Text style={s.name}>김유찬</Text>
              <Text style={s.phone}>010-4610-3405</Text>
            </View>
            <View style={s.row}>
              <Pressable style={s.cancelButton} onPress={closeModal}>
                <Text style={s.cancel}>아니요</Text>
              </Pressable>
              <Pressable
                onPress={() => router.push("/(child)/onboarding/success")}
                style={s.okButton}
              >
                <Text style={s.ok}>맞아요</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
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
  codeRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 5,
  },
  codeBox: {
    width: 40,
    height: 48,
    backgroundColor: "#E9E9E9",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  codeText: {
    fontSize: 32,
    fontWeight: "700",
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
});
