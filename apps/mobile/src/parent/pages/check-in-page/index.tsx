import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  mapCheckInToViewItem,
  useCheckInStore,
  type CheckInItem,
} from "@/src/shared/entities/check-in";

import {
  ParentCheckInHeader,
  ParentCheckInHistorySection,
  ParentCheckInQuickActionSection,
  ParentCheckInSendSuccessModal,
  ParentCheckInStatusBanner,
} from "./ui";

export default function ParentCheckInPage() {
  const router = useRouter();
  const rawItems = useCheckInStore((state) => state.items);
  const sendCheckIn = useCheckInStore((state) => state.sendCheckIn);
  const confirmCheckIn = useCheckInStore((state) => state.confirmCheckIn);
  const [isSendSuccessModalVisible, setIsSendSuccessModalVisible] =
    useState(false);
  const items = useMemo(
    () => rawItems.map((item) => mapCheckInToViewItem(item, "parent")),
    [rawItems],
  );

  const latestItem = items[0] ?? null;
  const pendingCount = items.filter(
    (item) => item.direction === "RECEIVED" && item.status === "NEW",
  ).length;

  const handleSendCheckIn = (message: string) => {
    sendCheckIn("parent", message);
    setIsSendSuccessModalVisible(true);
  };

  const handleConfirmCheckIn = (item: CheckInItem) => {
    if (item.direction !== "RECEIVED") return;
    confirmCheckIn(item.id, "parent");
  };

  const handleCloseSendSuccessModal = () => {
    setIsSendSuccessModalVisible(false);
  };

  const handleResendCheckIn = () => {
    setIsSendSuccessModalVisible(false);
  };
  return (
    <SafeAreaView style={s.safeArea} edges={["top"]}>
      <View style={s.screen}>
        <ScrollView
          contentContainerStyle={s.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <ParentCheckInHeader
            hasNotification={pendingCount > 0}
            onPressNotification={() => {}}
          />

          <ParentCheckInStatusBanner
            latestItem={latestItem}
            pendingCount={pendingCount}
            onConfirm={handleConfirmCheckIn}
          />

          <ParentCheckInHistorySection
            items={items}
            onPressHistory={() => router.push("/(parent)/check-in-history")}
          />
        </ScrollView>

        <View style={s.fixedQuickAction}>
          <ParentCheckInQuickActionSection onSend={handleSendCheckIn} />
        </View>
        <ParentCheckInSendSuccessModal
          visible={isSendSuccessModalVisible}
          onConfirm={handleCloseSendSuccessModal}
          onResend={handleResendCheckIn}
        />
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
