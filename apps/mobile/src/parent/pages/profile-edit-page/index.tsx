import mainProfileImg from "@/assets/profileimg/mainprofile.png";
import { mockUserProfile } from "@/src/parent/entities/user";
import { IconSymbol } from "@/src/shared/ui/IconSymbol";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileEditPage() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerIconButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <IconSymbol name="arrow.left" size={30} color="#34363D" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>프로필 수정</Text>

          <TouchableOpacity style={styles.saveButton} activeOpacity={0.8}>
            <Text style={styles.saveButtonText}>저장</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.avatarSection}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarBackground} />
              <Image source={mainProfileImg} style={styles.avatar} />
              <TouchableOpacity style={styles.cameraButton} activeOpacity={0.8}>
                <IconSymbol name="camera" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={styles.avatarHelpText}>
              프로필 사진을 변경할 수 있어요.
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>이름</Text>
              <View style={styles.inputBox}>
                <Text style={styles.inputText}>{mockUserProfile.name}</Text>
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>연령대</Text>
              <TouchableOpacity style={styles.selectBox} activeOpacity={0.8}>
                <Text style={styles.inputText}>60대</Text>
                <IconSymbol name="chevron.down" size={26} color="#171A20" />
              </TouchableOpacity>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>관계</Text>
              <TouchableOpacity style={styles.selectBox} activeOpacity={0.8}>
                <Text style={styles.inputText}>부모님 (자녀 계정)</Text>
                <IconSymbol name="chevron.down" size={26} color="#171A20" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.withdrawButton} activeOpacity={0.8}>
            <Text style={styles.withdrawButtonText}>회원 탈퇴</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FBFCFE",
  },
  header: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#ECEEF3",
    paddingHorizontal: 20,
  },
  headerIconButton: {
    position: "absolute",
    left: 16,
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontFamily: "Pretendard",
    fontSize: 20,
    fontWeight: "800",
    color: "#111111",
  },
  saveButton: {
    position: "absolute",
    right: 16,
    minWidth: 64,
    height: 42,
    borderRadius: 16,
    backgroundColor: "#4D79F6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#315FE9",
    shadowOpacity: 0.24,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 24,
  },
  avatarSection: {
    alignItems: "center",
  },
  avatarWrapper: {
    position: "relative",
    width: 160,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarBackground: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#F5F7FF",
    top: -10,
    left: -10,
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  cameraButton: {
    position: "absolute",
    right: 8,
    bottom: 8,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#1F3EA8",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  avatarHelpText: {
    marginTop: 18,
    fontSize: 14,
    fontWeight: "600",
    color: "#8E96A8",
  },
  form: {
    marginTop: 32,
    gap: 20,
  },
  fieldGroup: {
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2F333C",
  },
  inputBox: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E7E9EF",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  selectBox: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E7E9EF",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  inputText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333842",
  },
  withdrawButton: {
    marginTop: "auto",
    marginBottom: 32,
    height: 56,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#FF8D8D",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  withdrawButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#F05757",
  },
});
