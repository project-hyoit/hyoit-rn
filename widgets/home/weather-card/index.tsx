import { COLORS } from "@/shared/theme/colors";
import Card from "@/shared/ui/Card";
import React from "react";
import { Image, StyleSheet, Text } from "react-native";

type Props = { temp: number; summary?: string };

export default function WeatherCard({ temp, summary = "맑음" }: Props) {
  return (
    <Card style={s.card}>
      <Text style={s.title}>오늘의 날씨</Text>
      <Text style={s.temp}>{temp}°C</Text>
      <Image
        source={require("@/assets/images/weather-sun-cloud.png")}
        style={s.icon}
      />
      <Text style={s.summary}>{summary}</Text>
    </Card>
  );
}

const s = StyleSheet.create({
  card: { padding: 16, alignItems: "flex-start" },
  title: { color: COLORS.text, opacity: 0.9, marginBottom: 6 },
  temp: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 6,
  },
  icon: { width: 120, height: 72, resizeMode: "contain", alignSelf: "center" },
  summary: { marginTop: 6, color: COLORS.subText },
});
