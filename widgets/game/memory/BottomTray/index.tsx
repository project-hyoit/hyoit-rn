import { TEXT } from "@/shared/config/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = { remaining: string[] };

export default function BottomTray({ remaining }: Props) {
  return (
    <View style={s.wrap}>
      <Text style={s.title} allowFontScaling={false}>
        남은 모양
      </Text>
      <View style={s.row}>
        {remaining.map((emj, i) => (
          <Text key={i} style={s.emoji}>
            {emj}
          </Text>
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
  title: { textAlign: "center", fontSize: 16, fontWeight: "800", color: TEXT },
  row: {
    marginTop: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  emoji: { fontSize: 22 },
});
