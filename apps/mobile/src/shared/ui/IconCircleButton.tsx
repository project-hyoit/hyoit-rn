import { Pressable, StyleSheet, View } from "react-native";

import { IconSymbol } from "./IconSymbol";

type IconCircleButtonProps = {
  iconName: Parameters<typeof IconSymbol>[0]["name"];
  hasDot?: boolean;
  onPress?: () => void;
};

export default function IconCircleButton({
  iconName,
  hasDot = false,
  onPress,
}: IconCircleButtonProps) {
  return (
    <Pressable style={s.button} onPress={onPress}>
      {hasDot && <View style={s.dot} />}

      <IconSymbol name={iconName} size={21} color="#4A4A4A" />
    </Pressable>
  );
}

const s = StyleSheet.create({
  button: {
    position: "relative",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000000",
    shadowOpacity: 0.055,
    shadowRadius: 7,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 2,
  },

  dot: {
    position: "absolute",
    top: 7,
    right: 8,
    zIndex: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#1478FF",
  },
});
