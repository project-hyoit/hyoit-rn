import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  checkInMockPresets,
  mapCheckInToViewItem,
  type CheckInItem,
  type CheckInMockPresetKey,
  type CheckInRawItem,
} from "@/src/shared/entities/check-in";

import ChildCheckInHeader from "./ui/ChildCheckInHeader";
import ChildCheckInHistorySection from "./ui/ChildCheckInHistorySection";
import ChildCheckInQuickActionSection from "./ui/ChildCheckInQuickActionSection";
import ChildCheckInStatusBanner from "./ui/ChildCheckInStatusBanner";

const INITIAL_PRESET: CheckInMockPresetKey = "sentWaiting";

export default function ChildCheckInPage() {
  const [presetKey, setPresetKey] =
    useState<CheckInMockPresetKey>(INITIAL_PRESET);

  const [rawItems, setRawItems] = useState<CheckInRawItem[]>(
    checkInMockPresets[INITIAL_PRESET]
  );

  const items = useMemo(
    () => rawItems.map((item) => mapCheckInToViewItem(item, "child")),
    [rawItems]
  );

  const latestItem = items[0] ?? null;

  const pendingCount = items.filter(
    (item) => item.direction === "RECEIVED" && item.status === "NEW"
  ).length;

  const handleChangePreset = (nextPresetKey: CheckInMockPresetKey) => {
    setPresetKey(nextPresetKey);
    setRawItems(checkInMockPresets[nextPresetKey]);
  };

  const handleSendCheckIn = (message: string) => {
    const newItem: CheckInRawItem = {
      id: String(Date.now()),
      senderRole: "child",
      receiverRole: "parent",
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
      <View style={s.screen}>
        <ScrollView
          contentContainerStyle={s.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {__DEV__ && (
            <View style={s.devPanel}>
              {Object.keys(checkInMockPresets).map((key) => {
                const typedKey = key as CheckInMockPresetKey;
                const isActive = presetKey === typedKey;

                return (
                  <Pressable
                    key={typedKey}
                    style={[s.devButton, isActive && s.activeDevButton]}
                    onPress={() => handleChangePreset(typedKey)}
                  >
                    <Text
                      style={[
                        s.devButtonText,
                        isActive && s.activeDevButtonText,
                      ]}
                    >
                      {typedKey}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}

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
  devPanel: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#EEEEEE",
  },
  devButton: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
  },
  activeDevButton: {
    backgroundColor: "#1478FF",
  },
  devButtonText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#555555",
  },
  activeDevButtonText: {
    color: "#FFFFFF",
  },
});
