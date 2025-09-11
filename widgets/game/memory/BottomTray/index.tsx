import { FruitKey, fruitSrc } from "@/shared/assets/fruits";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type Props = { remaining: FruitKey[] };

export default function BottomTray({ remaining }: Props) {
  return (
    <View style={s.wrap}>
      <Text style={s.title} allowFontScaling={false}>
        남은 모양
      </Text>
      <View style={s.row}>
        {remaining.map((k, i) => (
          <Image
            key={i}
            source={fruitSrc[k]}
            style={s.icon}
            resizeMode="contain"
          />
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 6,
    marginTop: 18,
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "800",
    color: "#111",
  },
  row: {
    marginTop: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  icon: { width: 28, height: 28 },
});
