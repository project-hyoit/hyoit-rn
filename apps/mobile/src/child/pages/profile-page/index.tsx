import { logout, useAuthStore } from "@hyoit/auth";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import mainProfileImg from "@/assets/profileimg/mainprofile.png";
import { useOnboardingStore } from "@/src/parent/entities/auth/model/onboarding.store";
import ProfileMenu from "@/src/parent/features/edit-profile/ui/ProfileMenu";
import LogoutModal from "@/src/parent/features/logout/ui/LogoutModal";
import ProfileSettings from "@/src/parent/pages/profile-page/ui/ProfileSettings";
import { IconSymbol } from "@/src/shared/ui/IconSymbol";

const childProfile = {
  name: "김봄",
  phone: "010-4610-3404",
};

const connectedParent = {
  name: "김유찬",
  phone: "010-4610-3405",
  isOnline: true,
};

export default function ChildProfilePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const resetAuth = useAuthStore((state) => state.resetAuth);
  const onboardingName = useOnboardingStore((state) => state.name);
  const displayName = onboardingName.trim() || childProfile.name;

  const handleLogout = async () => {
    await logout();
    resetAuth();
    setIsLogoutModalOpen(false);
    router.replace("/(entry)/login");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.topCard}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>내 정보</Text>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push("/(child)/(tabs)/check-in")}
          >
            <IconSymbol name="bell" size={24} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <Image source={mainProfileImg} style={styles.avatar} />
            <TouchableOpacity
              style={styles.editAvatarButton}
              onPress={() => setIsMenuOpen(true)}
              activeOpacity={0.8}
            >
              <IconSymbol name="camera" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>{displayName}님</Text>
          <View style={styles.accountBadge}>
            <Text style={styles.accountBadgeText}>자녀 계정</Text>
          </View>
          <Text style={styles.description}>
            효잇으로 부모님과 안부를 주고받고 있어요.
          </Text>

          <TouchableOpacity
            style={styles.modifyButton}
            onPress={() => router.push("/(child)/(tabs)/profile/edit")}
            activeOpacity={0.8}
          >
            <Text style={styles.modifyButtonText}>프로필 수정</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.familySection}>
          <Text style={styles.sectionTitle}>연결된 가족</Text>

          <View style={styles.parentCard}>
            <View style={styles.parentLeft}>
              <Image source={mainProfileImg} style={styles.parentAvatar} />
              <View style={styles.parentTextArea}>
                <View style={styles.parentNameRow}>
                  <Text style={styles.parentName}>{connectedParent.name}</Text>
                  <Text style={styles.relation}>부모님</Text>
                </View>
                <Text style={styles.parentDescription}>
                  서로의 안부를 주고받고 있어요.
                </Text>
                <Text style={styles.phone}>{connectedParent.phone}</Text>
              </View>
            </View>

            <View style={styles.activeBadge}>
              <Text style={styles.activeBadgeText}>활성</Text>
            </View>
          </View>
        </View>

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
          onConfirm={handleLogout}
          onCancel={() => setIsLogoutModalOpen(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FB",
  },
  topCard: {
    alignSelf: "stretch",
    backgroundColor: "#FFFFFF",
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  iconButton: {
    position: "absolute",
    right: 0,
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 132,
    gap: 16,
    backgroundColor: "#F8F9FB",
  },
  profileCard: {
    width: "100%",
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  avatarWrap: {
    position: "relative",
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 30,
  },
  editAvatarButton: {
    position: "absolute",
    right: -4,
    bottom: -4,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#1E90FF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#F8F9FB",
  },
  name: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: "800",
    color: "#121212",
  },
  accountBadge: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "#EAF3FF",
  },
  accountBadgeText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1478FF",
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 20,
    color: "#3F3F46",
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
  familySection: {
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    color: "#1B1B1F",
  },
  parentCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
  },
  parentLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  parentAvatar: {
    width: 54,
    height: 54,
    borderRadius: 14,
  },
  parentTextArea: {
    flex: 1,
  },
  parentNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  parentName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  relation: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  parentDescription: {
    marginTop: 6,
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
  },
  phone: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "600",
    color: "#8A8A8A",
  },
  activeBadge: {
    minWidth: 54,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: "center",
    backgroundColor: "#E6F8EF",
  },
  activeBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2B8A3E",
  },
});
