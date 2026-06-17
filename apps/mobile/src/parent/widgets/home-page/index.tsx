import { router } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { HomeStatus } from "./types/home";
import {
  HomeCardGrid,
  HomeHeader,
  HomePrimaryAction,
  HomeStatusBanner,
} from "./ui";

export default function HomePage() {
  const homeStatus = "received" as HomeStatus;

  const handlePressStatusBanner = () => {
    router.push("/(parent)/(tabs)/chat");
  };

  return (
    <SafeAreaView style={s.safeArea} edges={["top"]}>
      <ScrollView
        contentContainerStyle={s.container}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader
          name="00"
          hasNotification={
            homeStatus === "received" || homeStatus === "multiple"
          }
          onPressNotification={() => router.push("/(parent)/(tabs)/chat")}
          onPressSetting={() => {}}
        />

        <HomeStatusBanner
          status={homeStatus}
          onPress={handlePressStatusBanner}
        />

        <HomePrimaryAction
          label="자녀에게 안부 보내기"
          onPress={() => router.push("/(parent)/(tabs)/chat")}
        />

        <HomeCardGrid
          onPressWeather={() => {}}
          onPressRecentGreeting={() => router.push("/(parent)/(tabs)/chat")}
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
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 128,
    gap: 16,
  },
});
