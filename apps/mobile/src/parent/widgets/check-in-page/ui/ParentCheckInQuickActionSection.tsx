import { StyleSheet, Text, View } from "react-native";

import { QUICK_CHECK_IN_MESSAGES } from "@/src/shared/entities/check-in";
import {
  CustomCheckInInput,
  QuickCheckInButton,
} from "@/src/shared/features/check-in/send-check-in";

interface ParentCheckInQuickActionSectionProps {
  onSend: (message: string) => void;
}

export default function ParentCheckInQuickActionSection({
  onSend,
}: ParentCheckInQuickActionSectionProps) {
  return (
    <View style={s.section}>
      <Text style={s.title}>안부 보내기</Text>

      <View style={s.grid}>
        {QUICK_CHECK_IN_MESSAGES.map((message) => (
          <QuickCheckInButton
            key={message}
            label={message}
            onPress={() => onSend(message)}
          />
        ))}
      </View>

      <CustomCheckInInput onSend={onSend} />
    </View>
  );
}

const s = StyleSheet.create({
  section: {
    gap: 10,
  },

  title: {
    fontSize: 13,
    fontWeight: "800",
    color: "#111111",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
});
