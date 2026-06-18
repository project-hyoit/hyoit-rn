import { StyleSheet, Text, View } from "react-native";

import type { CheckInItem } from "@/src/shared/entities/check-in";

import ParentCheckInHistoryCard from "./ParentCheckInHistoryCard";
interface ParentCheckInHistorySectionProps {
  items: CheckInItem[];
}

export default function ParentCheckInHistorySection({
  items,
}: ParentCheckInHistorySectionProps) {
  return (
    <View style={s.section}>
      <View style={s.headerRow}>
        <Text style={s.sectionTitle}>주고받은 안부 보기</Text>
        <Text style={s.moreText}>›</Text>
      </View>

      <View style={s.listBox}>
        {items.length === 0 ? (
          <View style={s.emptyBox}>
            <Text style={s.emptyIcon}>💬</Text>
            <Text style={s.emptyText}>표시할 안부가 없어요.</Text>
          </View>
        ) : (
          items
            .slice(0, 3)
            .map((item) => (
              <ParentCheckInHistoryCard key={item.id} item={item} />
            ))
        )}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  section: {
    gap: 10,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#111111",
  },

  moreText: {
    fontSize: 32,
    lineHeight: 32,
    fontWeight: "700",
    color: "#777777",
  },

  listBox: {
    minHeight: 218,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#DEDEDE",
    backgroundColor: "#FFFFFF",
    padding: 12,
  },

  emptyBox: {
    flex: 1,
    minHeight: 190,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },

  emptyIcon: {
    fontSize: 18,
    opacity: 0.35,
  },

  emptyText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#A0A0A0",
  },
});
