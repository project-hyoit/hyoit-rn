import { useState } from "react";
import { StyleSheet, View } from "react-native";

import type { UserProfile } from "@/src/parent/entities/user/model/types";
import ProfileMenu from "@/src/parent/features/edit-profile/ui/ProfileMenu";
import LogoutModal from "@/src/parent/features/logout/ui/LogoutModal";

import ConnectedChildrenTitle from "./ConnectedChildrenTitle";
import LogoutButton from "./LogoutButton";
import ProfileAvatar from "./ProfileAvatar";
import ProfileInfo from "./ProfileInfo";

interface Props {
  user: UserProfile;
}

export default function ProfileSection({ user }: Props) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <View>
      <View style={styles.container}>
        <ProfileAvatar onPressEdit={() => setIsMenuOpen(true)} />

        <ProfileInfo user={user} />

        <LogoutButton onPress={() => setIsLogoutModalOpen(true)} />

        <ProfileMenu
          visible={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onSelectAlbum={() => setIsMenuOpen(false)}
          onDefault={() => setIsMenuOpen(false)}
        />

        <LogoutModal
          visible={isLogoutModalOpen}
          onConfirm={() => setIsLogoutModalOpen(false)}
          onCancel={() => setIsLogoutModalOpen(false)}
        />
      </View>

      <ConnectedChildrenTitle />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 30,
  },
});
