import { router } from "expo-router";
import { useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  mapCheckInToViewItem,
  useCheckInStore,
} from "@/src/shared/entities/check-in";
import type { HomeStatus } from "./types/home";
import {
  HomeCardGrid,
  HomeHeader,
  HomePrimaryAction,
  HomeStatusBanner,
} from "./ui";

export default function HomePage() {
  const rawItems = useCheckInStore((state) => state.items);
  const hasHydrated = useCheckInStore((state) => state.hasHydrated);
  const items = useMemo(
    () => rawItems.map((item) => mapCheckInToViewItem(item, "parent")),
    [rawItems],
  );

  const pendingReceivedCount = items.filter(
    (item) => item.direction === "RECEIVED" && item.status === "NEW",
  ).length;
  const latestSentItem = useMemo(
    () =>
      items
        .filter((item) => item.direction === "SENT")
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )[0] ?? null,
    [items],
  );

  const homeStatus: HomeStatus = useMemo(() => {
    if (pendingReceivedCount > 1) return "multiple";
    if (pendingReceivedCount === 1) return "received";
    if (latestSentItem?.status === "WAITING_CONFIRM") return "sent";
    if (latestSentItem?.status === "CONFIRMED") return "checked";
    return "empty";
  }, [latestSentItem, pendingReceivedCount]);

  if (!hasHydrated) {
    return <SafeAreaView style={s.safeArea} edges={["top"]} />;
  }

  const moveToCheckIn = () => {
    router.push("/(parent)/(tabs)/check-in");
  };

  return (
    <SafeAreaView style={s.safeArea} edges={["top"]}>
      <ScrollView
        contentContainerStyle={s.container}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader
          name="00"
          hasNotification={pendingReceivedCount > 0}
          onPressNotification={moveToCheckIn}
          onPressSetting={() => {}}
        />

        <HomeStatusBanner status={homeStatus} onPress={moveToCheckIn} />

        <HomePrimaryAction
          label="자녀에게 안부 보내기"
          onPress={moveToCheckIn}
        />

        <HomeCardGrid
          onPressWeather={() => {}}
          onPressRecentGreeting={moveToCheckIn}
          onPressGame={() => router.push("/(parent)/(tabs)/game")}
          onPressHelp={() => {}}
        />
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
    paddingHorizontal: 24,
    paddingTop: 22,
    paddingBottom: 132,
    gap: 14,
  },
});
