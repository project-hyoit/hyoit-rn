import { DefaultTheme as RNLight } from "@react-navigation/native";

export const LightTheme = {
  ...RNLight,
  colors: {
    ...RNLight.colors,
    primary: "#0a7ea4",
    background: "#F8F8F8",
    card: "#fff",
    text: "#11181C",
    border: "#E5E7EB",
    notification: "#0a7ea4",
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: "#0a7ea4",
  },
};
