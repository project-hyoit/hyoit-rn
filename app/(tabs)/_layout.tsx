import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { QueryProvider } from "@/shared/providers/QueryProvider";
import { HapticTab } from "@/shared/ui/HapticTab";
import { IconSymbol } from "@/shared/ui/IconSymbol";
import TabBarBackground from "@/widgets/BottomTabBar/TabBarBackground";
import { useTheme } from "@react-navigation/native";
export default function TabLayout() {
  const { colors } = useTheme() as any;
  return (
    <QueryProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.tabIconSelected || colors.primary,
          tabBarInactiveTintColor: colors.tabIconDefault || colors.text,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "시작",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="paperplane.fill" color={color} />
            ),
          }}
        />
      </Tabs>
    </QueryProvider>
  );
}
