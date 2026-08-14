import { IconSymbol } from "@/src/shared/ui/IconSymbol";
import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const notificationItems = [
  {
    title: "부모님 안부 알림",
    description: "부모님이 안부를 보내면 바로 알려드려요.",
  },
  {
    title: "답장 알림",
    description: "부모님이 내 안부에 답장을 남기면 알려드려요.",
  },
  {
    title: "디데이 알림",
    description: "등록한 일정이 가까워지면 미리 알려드려요.",
  },
] as const;

export default function ChildNotificationSettingsPage() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    "부모님 안부 알림": true,
    "답장 알림": true,
    "디데이 알림": false,
  });

  const toggleItem = (title: string) => {
    setEnabled((prev) => ({ ...prev, [title]: !prev[title] }));
  };

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
        <Text style={styles.headerTitle}>알림 설정</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {notificationItems.map((item, index) => (
            <View
              key={item.title}
              style={[
                styles.row,
                index === notificationItems.length - 1 && styles.lastRow,
              ]}
            >
              <View style={styles.textArea}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
              <Switch
                value={enabled[item.title]}
                onValueChange={() => toggleItem(item.title)}
                trackColor={{ false: "#D7DBE5", true: "#BFD0FF" }}
                thumbColor={enabled[item.title] ? "#4D79F6" : "#FFFFFF"}
              />
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
  row: {
    minHeight: 86,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F4F7",
  },
  lastRow: {
    borderBottomWidth: 0,
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
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
    color: "#6B7280",
  },
});
