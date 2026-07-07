import { BottomTabBar } from "@/src/parent/widgets/layout";
import { IconSymbol } from "@/src/shared/ui/IconSymbol";
import { Tabs } from "expo-router";

const ACTIVE = "#1E90FF";
const INACTIVE = "#D9D9D9";

export default function ChildTabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "시작",
          tabBarIcon: ({ focused, size }) => (
            <IconSymbol
              name="house.fill"
              size={size}
              color={focused ? ACTIVE : INACTIVE}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="check-in"
        options={{
          title: "대화",
          tabBarIcon: ({ focused, size }) => (
            <IconSymbol
              name="text.bubble.fill"
              size={size}
              color={focused ? ACTIVE : INACTIVE}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "내 정보",
          tabBarIcon: ({ focused, size }) => (
            <IconSymbol
              name="person.fill"
              size={size}
              color={focused ? ACTIVE : INACTIVE}
            />
          ),
        }}
      />
    </Tabs>
  );
}
