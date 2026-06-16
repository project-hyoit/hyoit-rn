import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  onPress: () => void;
}

export default function LogoutButton({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.logout} onPress={onPress}>
      <Text style={styles.logoutText}>로그아웃</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logout: {
    marginTop: 16,
    paddingHorizontal: 12,
    height: 26,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    elevation: 2,
  },
  logoutText: {
    fontSize: 12,
  },
});
