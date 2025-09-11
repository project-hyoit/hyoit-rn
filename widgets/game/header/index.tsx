import { IconSymbol } from "@/shared/ui/IconSymbol";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = { title: string };

export default function GameHeader({ title }: Props) {
  return (
    <View style={styles.wrap}>
      <IconSymbol size={24} name="gamecontroller.fill" color="#000" />
      <Text style={styles.title} allowFontScaling={false}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
});
