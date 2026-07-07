import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useDdayStore } from "@/src/child/entities/dday";
import { IconSymbol } from "@/src/shared/ui/IconSymbol";

const NAME_LIMIT = 20;
const MEMO_LIMIT = 100;

const normalizeDateInput = (value: string) => {
  const matched = value.match(/^(\d{4})[.\-/\s]+(\d{1,2})[.\-/\s]+(\d{1,2})/);

  if (!matched) {
    return null;
  }

  const [, yearText, monthText, dayText] = matched;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return [
    String(year).padStart(4, "0"),
    String(month).padStart(2, "0"),
    String(day).padStart(2, "0"),
  ].join("-");
};

export default function ChildDdayAddPage() {
  const addItem = useDdayStore((state) => state.addItem);
  const [title, setTitle] = useState("");
  const [dateText, setDateText] = useState("");
  const [memo, setMemo] = useState("");

  const handleSave = () => {
    const normalizedDate = normalizeDateInput(dateText);

    if (!title.trim()) {
      Alert.alert("일정 이름 필요", "디데이 이름을 입력해주세요.");
      return;
    }

    if (!normalizedDate) {
      Alert.alert("날짜 확인", "날짜를 2026. 08. 10 형식으로 입력해주세요.");
      return;
    }

    addItem({
      title: title.trim(),
      date: normalizedDate,
      memo: memo.trim() || undefined,
    });
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerIconButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <IconSymbol name="arrow.left" size={28} color="#111111" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>디데이 추가</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>일정 이름</Text>
          <View style={styles.inputBox}>
            <TextInput
              value={title}
              onChangeText={(value) => setTitle(value.slice(0, NAME_LIMIT))}
              style={styles.inputText}
              placeholder="일정 이름"
              placeholderTextColor="#A0A4AF"
            />
          </View>
          <Text style={styles.counter}>{title.length}/{NAME_LIMIT}</Text>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>날짜</Text>
          <View style={styles.dateInputBox}>
            <TextInput
              value={dateText}
              onChangeText={setDateText}
              style={styles.inputText}
              placeholder="2026. 08. 10"
              placeholderTextColor="#A0A4AF"
            />
            <IconSymbol name="calendar" size={23} color="#6B7280" />
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>메모 (선택)</Text>
          <View style={styles.memoBox}>
            <TextInput
              value={memo}
              onChangeText={(value) => setMemo(value.slice(0, MEMO_LIMIT))}
              style={styles.memoText}
              placeholder="메모를 입력해주세요"
              placeholderTextColor="#A0A4AF"
              multiline
              textAlignVertical="top"
            />
          </View>
          <Text style={styles.counter}>{memo.length}/{MEMO_LIMIT}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.85}
        >
          <Text style={styles.saveButtonText}>저장하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  headerIconButton: {
    position: "absolute",
    left: 18,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 21,
    fontWeight: "900",
    color: "#111111",
  },
  container: {
    paddingHorizontal: 14,
    paddingTop: 34,
    paddingBottom: 140,
    gap: 34,
  },
  fieldGroup: {
    gap: 12,
  },
  label: {
    fontSize: 15,
    fontWeight: "900",
    color: "#222222",
  },
  inputBox: {
    height: 56,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DADDE3",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  dateInputBox: {
    height: 56,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DADDE3",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 18,
    paddingRight: 14,
  },
  inputText: {
    flex: 1,
    fontSize: 17,
    fontWeight: "700",
    color: "#333842",
    padding: 0,
  },
  memoBox: {
    minHeight: 118,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DADDE3",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  memoText: {
    minHeight: 84,
    fontSize: 16,
    lineHeight: 23,
    fontWeight: "700",
    color: "#333842",
    padding: 0,
  },
  counter: {
    alignSelf: "flex-end",
    fontSize: 13,
    fontWeight: "700",
    color: "#8A8A8A",
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 14,
    paddingTop: 18,
    paddingBottom: 26,
    backgroundColor: "#FFFFFF",
  },
  saveButton: {
    height: 54,
    borderRadius: 8,
    backgroundColor: "#4D79F6",
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFFFFF",
  },
});
