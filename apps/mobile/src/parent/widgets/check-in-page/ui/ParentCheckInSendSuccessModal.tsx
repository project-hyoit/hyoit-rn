import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface ParentCheckInSendSuccessModalProps {
  visible: boolean;
  onConfirm: () => void;
  onResend: () => void;
}

export default function ParentCheckInSendSuccessModal({
  visible,
  onConfirm,
  onResend,
}: ParentCheckInSendSuccessModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent
      onRequestClose={onConfirm}
    >
      <View style={s.overlay}>
        <View style={s.modal}>
          <View style={s.content}>
            <View style={s.checkOuter}>
              <View style={s.checkCircle}>
                <Text style={s.checkText}>✓</Text>
              </View>
            </View>

            <Text style={s.title}>안부를 보냈어요!</Text>

            <Text style={s.description}>
              자녀가 확인하면{"\n"}상태가 표시돼요.
            </Text>
          </View>

          <View style={s.actionArea}>
            <Pressable style={s.confirmButton} onPress={onConfirm}>
              <Text style={s.confirmButtonText}>확인</Text>
            </Pressable>

            <Pressable style={s.resendButton} onPress={onResend}>
              <Text style={s.resendButtonText}>다시 보내기</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  modal: {
    minHeight: 520,
    justifyContent: "center",
  },

  content: {
    alignItems: "center",
    marginBottom: 64,
  },

  checkOuter: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#BFF4C9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 42,
  },

  checkCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#00C51A",
    alignItems: "center",
    justifyContent: "center",
  },

  checkText: {
    fontSize: 52,
    lineHeight: 58,
    fontWeight: "900",
    color: "#FFFFFF",
  },

  title: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "900",
    color: "#050505",
    marginBottom: 22,
  },

  description: {
    fontSize: 20,
    lineHeight: 32,
    fontWeight: "800",
    color: "#777777",
    textAlign: "center",
  },

  actionArea: {
    gap: 22,
  },

  confirmButton: {
    height: 56,
    borderRadius: 10,
    backgroundColor: "#1478FF",
    alignItems: "center",
    justifyContent: "center",
  },

  confirmButtonText: {
    fontSize: 17,
    fontWeight: "900",
    color: "#FFFFFF",
  },

  resendButton: {
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },

  resendButtonText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#1478FF",
  },
});
