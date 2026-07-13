import { IconSymbol } from "@/src/shared/ui/IconSymbol";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const helpItems = [
  {
    title: "부모님께 안부 보내기",
    description: "홈이나 안부 확인 화면에서 오늘의 안부를 보낼 수 있어요.",
  },
  {
    title: "디데이 관리",
    description: "중요한 가족 일정을 등록하고 알림을 받을 수 있어요.",
  },
  {
    title: "프로필 변경",
    description: "내 정보에서 이름과 프로필 사진을 바꿀 수 있어요.",
  },
] as const;

export default function ChildHelpPage() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerIconButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <IconSymbol name="arrow.left" size={30} color="#34363D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>도움말</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {helpItems.map((item, index) => (
            <View
              key={item.title}
              style={[styles.item, index === helpItems.length - 1 && styles.lastItem]}
            >
              <View style={styles.iconBox}>
                <IconSymbol name="questionmark" size={17} color="#4D79F6" />
              </View>
              <View style={styles.textArea}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
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
    paddingHorizontal: 24,
  },
  headerIconButton: {
    position: "absolute",
    left: 24,
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111111",
  },
  content: {
    padding: 24,
  },
  card: {
    width: "100%",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F4F7",
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "#EDF3FF",
    justifyContent: "center",
    alignItems: "center",
  },
  textArea: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
  },
  description: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
    color: "#6B7280",
  },
});
