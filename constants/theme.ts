import {
  DarkTheme as RNDark,
  DefaultTheme as RNLight,
} from "@react-navigation/native";
import { Colors } from "./Colors";

// Color.ts와 React Navigation 병합
export const LightTheme = {
  ...RNLight,
  colors: {
    ...RNLight.colors,
    primary: Colors.light.tint,
    background: Colors.light.background,
    card: Colors.light.background,
    text: Colors.light.text,
    border: "#E5E7EB",
    notification: Colors.light.tint,
    icon: Colors.light.icon,
    tabIconDefault: Colors.light.tabIconDefault,
    tabIconSelected: Colors.light.tabIconSelected,
  },
};

export const DarkTheme = {
  ...RNDark,
  colors: {
    ...RNDark.colors,
    primary: Colors.dark.tint,
    background: Colors.dark.background,
    card: Colors.dark.background,
    text: Colors.dark.text,
    border: "#374151",
    notification: Colors.dark.tint,
    icon: Colors.dark.icon,
    tabIconDefault: Colors.dark.tabIconDefault,
    tabIconSelected: Colors.dark.tabIconSelected,
  },
};
