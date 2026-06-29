import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import type { UserProfile } from "@/src/parent/entities/user/model/types";
import ProfileAvatar from "./ProfileAvatar";
import ProfileInfo from "./ProfileInfo";

interface Props {
  user: UserProfile;
  onPressEdit: () => void;
  onPressModify: () => void;
}

export default function ProfileSection({ user, onPressEdit, onPressModify }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <ProfileAvatar onPressEdit={onPressEdit} />

        <ProfileInfo user={user} />

        <TouchableOpacity style={styles.modifyButton} onPress={onPressModify}>
          <Text style={styles.modifyButtonText}>프로필 수정</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 16,
  },
  profileCard: {
    width: "100%",
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  modifyButton: {
    marginTop: 16,
    width: "100%",
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DDE0EE",
    justifyContent: "center",
    alignItems: "center",
  },
  modifyButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F3EA8",
  },
});
