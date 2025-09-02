import {
  DarkTheme as RNDark,
  DefaultTheme as RNLight,
} from "@react-navigation/native";

export const LightTheme = {
  ...RNLight,
  colors: {
    ...RNLight.colors,
    primary: "#0a7ea4",
    background: "#fff",
    card: "#fff",
    text: "#11181C",
    border: "#E5E7EB",
    notification: "#0a7ea4",
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: "#0a7ea4",
  },
};

export const DarkTheme = {
  ...RNDark,
  colors: {
    ...RNDark.colors,
    primary: "#fff",
    background: "#151718",
    card: "#151718",
    text: "#ECEDEE",
    border: "#374151",
    notification: "#fff",
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: "#fff",
  },
};
