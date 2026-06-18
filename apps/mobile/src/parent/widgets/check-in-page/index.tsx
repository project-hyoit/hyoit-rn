import { useMemo, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  mapCheckInToViewItem,
  type CheckInItem,
  type CheckInRawItem,
} from "@/src/shared/entities/check-in";

import {
  ParentCheckInHeader,
  ParentCheckInHistorySection,
  ParentCheckInQuickActionSection,
  ParentCheckInStatusBanner,
} from "./ui";

export default function ParentCheckInPage() {
  const [rawItems, setRawItems] = useState<CheckInRawItem[]>([]);

  const items = useMemo(
    () => rawItems.map((item) => mapCheckInToViewItem(item, "parent")),
    [rawItems]
  );

  const latestItem = items[0] ?? null;

  const pendingCount = items.filter(
    (item) => item.direction === "RECEIVED" && item.status === "NEW"
  ).length;

  const handleSendCheckIn = (message: string) => {
    const newItem: CheckInRawItem = {
      id: String(Date.now()),
      senderRole: "parent",
      receiverRole: "child",
      message,
      type: "QUESTION",
      createdAt: new Date().toISOString(),
    };

    setRawItems((prev) => [newItem, ...prev]);
  };

  const handleConfirmCheckIn = (item: CheckInItem) => {
    if (item.direction !== "RECEIVED") return;

    setRawItems((prev) =>
      prev.map((rawItem) =>
        rawItem.id === item.id
          ? {
              ...rawItem,
              checkedAt: new Date().toISOString(),
            }
          : rawItem
      )
    );
  };

  return (
    <SafeAreaView style={s.safeArea} edges={["top"]}>
      <ScrollView
        contentContainerStyle={s.container}
        showsVerticalScrollIndicator={false}
      >
        <ParentCheckInHeader />

        <ParentCheckInStatusBanner
          latestItem={latestItem}
          pendingCount={pendingCount}
          onConfirm={handleConfirmCheckIn}
        />

        <ParentCheckInHistorySection items={items} />

        <ParentCheckInQuickActionSection onSend={handleSendCheckIn} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 116,
    gap: 18,
  },
});
