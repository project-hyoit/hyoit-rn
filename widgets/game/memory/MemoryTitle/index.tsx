import React from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

type Props = {
  size: number;
  source: ImageSourcePropType;
  disabled?: boolean;
  onPress?: () => void;
};

export default function MemoryTile({ size, source, disabled, onPress }: Props) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        s.box,
        { width: size, height: size, borderRadius: 12 },
        pressed && { opacity: 0.92 },
      ]}
    >
      <View style={s.inner}>
        <Image source={source} style={s.img} resizeMode="contain" />
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  box: {
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#111",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  inner: { flex: 1, alignItems: "center", justifyContent: "center" },
  img: {
    width: "72%",
    height: "72%",
  },
});
