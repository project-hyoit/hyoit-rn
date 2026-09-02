import { StyleSheet, Text, View } from "react-native";

import type { UserProfile } from "../model/types";

interface Props {
  user: UserProfile;
}

export default function ProfileInfo({ user }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.name}님</Text>
      <View style={styles.accountBadge}>
        <Text style={styles.accountBadgeText}>부모 계정</Text>
      </View>
      <Text style={styles.description}>
        효잇으로 가족과 연결되어 있어요.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  name: {
    fontFamily: "Pretendard",
    fontSize: 28,
    fontWeight: "800",
    color: "#121212",
  },
  accountBadge: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "#EEF2FF",
  },
  accountBadgeText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F3EA8",
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 20,
  },
});
