import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface LogoutModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LogoutModal({
  visible,
  onConfirm,
  onCancel,
}: LogoutModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>로그아웃</Text>
          <Text style={styles.text}>로그아웃 하시겠어요?</Text>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.logoutButton} onPress={onConfirm}>
              <Text style={styles.logoutText}>로그아웃</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>아니요</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  box: {
    width: 356,
    backgroundColor: "#fff",
    padding: 28,
    borderRadius: 12,
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  text: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },

  buttons: {
    marginTop: 32,
    flexDirection: "row",
    gap: 16,
  },

  logoutText: {
    color: "#1E90FF",
    fontWeight: "bold",
    fontSize: 16,
  },

  logoutButton: {
    width: 142,
    height: 48,
    borderColor: "#1E90FF",
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  cancelText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  cancelButton: {
    width: 142,
    height: 48,
    backgroundColor: "#1E90FF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
