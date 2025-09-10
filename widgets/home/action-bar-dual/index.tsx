import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Action = { label: string; onPress(): void };
type Props = { left: Action; right: Action };

export default function ActionBarDual({ left, right }: Props) {
  return (
    <View style={s.wrap}>
      <Pressable onPress={left.onPress} style={[s.btn, s.primary]}>
        <Text style={s.btnText}>{left.label}</Text>
      </Pressable>
      <View style={s.divider} />
      <Pressable onPress={right.onPress} style={[s.btn, s.primary]}>
        <Text style={s.btnText}>{right.label}</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#1E90FF",
    borderRadius: 12,
    padding: 16,
  },
  btn: { flex: 1, alignItems: "center" },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  primary: {},
  divider: { width: 1, height: 28, backgroundColor: "#fff", borderRadius: 1 },
});
