import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import { IconSymbol } from "@/src/shared/ui/IconSymbol";
import { mockChildUsers, mockUserProfile } from "../../entities/user/model/mock";
import ChildList from "../../entities/user/ui/ChildList";
import ProfileSettings from "./ui/ProfileSettings";
import { ProfileSection } from "./ui";
import ProfileMenu from "@/src/parent/features/edit-profile/ui/ProfileMenu";
import LogoutModal from "@/src/parent/features/logout/ui/LogoutModal";

export default function ProfilePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topCard}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>내 정보</Text>
            <TouchableOpacity style={styles.iconButton}>
              <IconSymbol name="bell" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        <ProfileSection
          user={mockUserProfile}
          onPressEdit={() => setIsMenuOpen(true)}
          onPressModify={() => setIsMenuOpen(true)}
        />

        <ChildList items={mockChildUsers} />

        <ProfileSettings
          onPressNotification={() => undefined}
          onPressChangePhoto={() => setIsMenuOpen(true)}
          onPressHelp={() => undefined}
          onPressLogout={() => setIsLogoutModalOpen(true)}
        />

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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: 0,
    paddingBottom: 32,
    gap: 16,
    backgroundColor: "#F8F9FB",
  },
  topCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    marginBottom: 0,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Pretendard",
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#F5F7FF",
    justifyContent: "center",
    alignItems: "center",
  },
});
