import type { UserProfile } from "@/src/parent/entities/user/model/types";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  user: UserProfile;
}

export default function ProfileInfo({ user }: Props) {
  return (
    <>
      <Text style={styles.name}>{user.name}</Text>

      <View style={styles.info}>
        <Text style={styles.infoText}>{user.age}세</Text>
        <Text style={styles.infoText}>{user.phone}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  name: {
    fontFamily: "Pretendard",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 24,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },
  infoText: {
    fontFamily: "Pretendard",
    fontSize: 12,
    fontWeight: "600",
  },
});
