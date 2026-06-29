import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "@/src/shared/ui/IconSymbol";

interface Props {
  onPressNotification: () => void;
  onPressChangePhoto: () => void;
  onPressHelp: () => void;
  onPressLogout: () => void;
}

const settings = [
  { label: "알림 설정", icon: "bell", action: "notification" },
  { label: "프로필 사진 변경", icon: "camera", action: "photo" },
  { label: "도움말", icon: "questionmark", action: "help" },
  { label: "로그아웃", icon: "xmark", action: "logout" },
] as const;

type SettingIconName = typeof settings[number]["icon"];

type SettingAction = typeof settings[number]["action"];

export default function ProfileSettings({
  onPressNotification,
  onPressChangePhoto,
  onPressHelp,
  onPressLogout,
}: Props) {
  const handlePress = (action: SettingAction) => {
    switch (action) {
      case "notification":
        onPressNotification();
        break;
      case "photo":
        onPressChangePhoto();
        break;
      case "help":
        onPressHelp();
        break;
      case "logout":
        onPressLogout();
        break;
    }
  };

  return (
    <View style={styles.container}>
      {settings.map((item) => (
        <TouchableOpacity
          key={item.label}
          style={styles.row}
          onPress={() => handlePress(item.action)}
          activeOpacity={0.7}
        >
          <View style={styles.left}>
            <View style={styles.iconBox}>
              <IconSymbol name={item.icon as SettingIconName} size={18} color="#1F3EA8" />
            </View>
            <Text style={styles.label}>{item.label}</Text>
          </View>
          <IconSymbol name="chevron.right" size={20} color="#C4C4C4" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F4F7",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
});
