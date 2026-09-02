import { useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  mapCheckInToViewItem,
  useCheckInStore,
  type CheckInItem,
} from "@/src/shared/entities/check-in";

import ChildCheckInHeader from "./ui/ChildCheckInHeader";
import ChildCheckInHistorySection from "./ui/ChildCheckInHistorySection";
import ChildCheckInQuickActionSection from "./ui/ChildCheckInQuickActionSection";
import ChildCheckInStatusBanner from "./ui/ChildCheckInStatusBanner";

export default function ChildCheckInPage() {
  const rawItems = useCheckInStore((state) => state.items);
  const hasHydrated = useCheckInStore((state) => state.hasHydrated);
  const sendCheckIn = useCheckInStore((state) => state.sendCheckIn);
  const confirmCheckIn = useCheckInStore((state) => state.confirmCheckIn);

  const items = useMemo(
    () => rawItems.map((item) => mapCheckInToViewItem(item, "child")),
    [rawItems],
  );
  const latestItem = items[0] ?? null;
  const pendingCount = items.filter(
    (item) => item.direction === "RECEIVED" && item.status === "NEW",
  ).length;

  const handleSendCheckIn = (message: string) => {
    sendCheckIn("child", message);
  };

  const handleConfirmCheckIn = (item: CheckInItem) => {
    if (item.direction !== "RECEIVED") return;
    confirmCheckIn(item.id, "child");
  };

  if (!hasHydrated) {
    return <SafeAreaView style={s.safeArea} edges={["top"]} />;
  }

  return (
    <SafeAreaView style={s.safeArea} edges={["top"]}>
      <View style={s.screen}>
        <ScrollView
          contentContainerStyle={s.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <ChildCheckInHeader
            hasNotification={pendingCount > 0}
            onPressNotification={() => {}}
          />

          <ChildCheckInStatusBanner
            latestItem={latestItem}
            pendingCount={pendingCount}
            onConfirm={handleConfirmCheckIn}
          />

          <ChildCheckInHistorySection items={items} />
        </ScrollView>

        <View style={s.fixedQuickAction}>
          <ChildCheckInQuickActionSection onSend={handleSendCheckIn} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  screen: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 230,
    gap: 18,
  },
  fixedQuickAction: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 18,
    backgroundColor: "#F8F8F8",
  },
});
