import { StyleSheet, Text, View } from "react-native";

import { QUICK_CHECK_IN_MESSAGES } from "@/src/shared/entities/check-in";
import {
  CustomCheckInInput,
  QuickCheckInButton,
} from "@/src/shared/features/check-in/send-check-in";

interface ChildCheckInQuickActionSectionProps {
  onSend: (message: string) => void;
}

export default function ChildCheckInQuickActionSection({
  onSend,
}: ChildCheckInQuickActionSectionProps) {
  return (
    <View style={s.section}>
      <Text style={s.title}>부모님께 안부 보내기</Text>

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
    marginTop: 26,
  },
  title: {
    fontSize: 15,
    fontWeight: "900",
    color: "#111111",
    marginBottom: 4,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
});
