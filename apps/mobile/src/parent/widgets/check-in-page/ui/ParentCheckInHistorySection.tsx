import { StyleSheet, Text, View } from "react-native";

import {
  formatCheckInTime,
  getCheckInStatusLabel,
  type CheckInItem,
} from "@/src/shared/entities/check-in";

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
        <Text style={s.moreText}>〉</Text>
      </View>

      <View style={s.listBox}>
        {items.length === 0 ? (
          <View style={s.emptyBox}>
            <Text style={s.emptyText}>표시할 안부가 없어요.</Text>
          </View>
        ) : (
          items.slice(0, 3).map((item) => (
            <View key={item.id} style={s.card}>
              <View style={s.cardContent}>
                <Text style={s.badge}>
                  {item.direction === "SENT" ? "보낸 안부" : "받은 안부"}
                </Text>

                <Text style={s.message}>“{item.message}”</Text>

                <Text style={s.meta}>
                  {formatCheckInTime(item.createdAt)} ·{" "}
                  {getCheckInStatusLabel("parent", item.status)}
                </Text>
              </View>

              <View
                style={[
                  s.statusCircle,
                  item.status === "NEW" && s.newCircle,
                  item.status === "CONFIRMED" && s.confirmedCircle,
                ]}
              >
                <Text style={s.statusCircleText}>
                  {item.status === "NEW"
                    ? "N"
                    : item.status === "CONFIRMED"
                    ? "✓"
                    : "∨"}
                </Text>
              </View>
            </View>
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
    fontSize: 13,
    fontWeight: "800",
    color: "#111111",
  },

  moreText: {
    fontSize: 18,
    color: "#777777",
  },

  listBox: {
    minHeight: 160,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
    padding: 12,
    gap: 10,
  },

  emptyBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 130,
  },

  emptyText: {
    fontSize: 13,
    color: "#999999",
  },

  card: {
    minHeight: 72,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    backgroundColor: "#FFFFFF",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  cardContent: {
    flex: 1,
    gap: 4,
  },

  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: "#EEF5FF",
    fontSize: 10,
    fontWeight: "800",
    color: "#1478FF",
  },

  message: {
    fontSize: 14,
    fontWeight: "900",
    color: "#111111",
  },

  meta: {
    fontSize: 12,
    color: "#777777",
  },

  statusCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#D0D0D0",
    alignItems: "center",
    justifyContent: "center",
  },

  newCircle: {
    backgroundColor: "#FF5C72",
  },

  confirmedCircle: {
    backgroundColor: "#3D9B5E",
  },

  statusCircleText: {
    fontSize: 12,
    fontWeight: "900",
    color: "#FFFFFF",
  },
});
