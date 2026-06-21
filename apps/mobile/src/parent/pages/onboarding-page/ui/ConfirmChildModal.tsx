import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmChildModal({
  visible,
  onClose,
  onConfirm,
}: Props) {
  if (!visible) return null;

  return (
    <View style={s.overlay}>
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

      <View style={s.bottomSheet}>
        <Text style={s.sheetTitle}>자녀분이 맞으신가요?</Text>

        <View style={s.userCard}>
          <View style={s.textRow}>
            <Text style={s.name}>김유찬</Text>
            <Text style={s.divider}>|</Text>
            <Text style={s.age}>23세</Text>
          </View>

          <Text style={s.phone}>010-4610-3405</Text>
        </View>

        <View style={s.row}>
          <Pressable style={s.cancelButton} onPress={onClose}>
            <Text style={s.cancel}>아니요</Text>
          </Pressable>

          <Pressable style={s.okButton} onPress={onConfirm}>
            <Text style={s.ok}>맞아요</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
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
    width: "90%",
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 12,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 14,
  },
  userCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 8,
    paddingLeft: 20,
    marginBottom: 36,
  },
  textRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
  },
  divider: {
    fontSize: 20,
    fontWeight: "300",
    paddingHorizontal: 12,
  },
  age: {
    fontSize: 15,
    fontWeight: "500",
  },
  phone: {
    marginTop: 9,
    fontSize: 16,
    fontWeight: "500",
    color: "#7B7B7B",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    padding: 10,
    paddingHorizontal: 49,
    borderColor: "#1E8FFF",
    borderWidth: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cancel: {
    color: "#1E90FF",
    fontSize: 16,
    fontWeight: "700",
  },
  okButton: {
    padding: 10,
    paddingHorizontal: 49,
    backgroundColor: "#1E90FF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  ok: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
