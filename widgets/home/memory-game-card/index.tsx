import Card from "@/shared/ui/Card";
import React from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";

type Props = { onPress(): void };

export default function MemoryGameCard({ onPress }: Props) {
  return (
    <Card style={s.card}>
      <Text style={s.title}>카드 맞추기</Text>
      <Text style={s.body}>같은 카드를{"\n"}기억해서 뒤집으세요</Text>
      <Image
        source={require("@/assets/images/banana-cards.png")}
        style={s.img}
      />
      <Pressable onPress={onPress}>
        <Text style={s.link}>카드 맞추기 게임하기 ▶</Text>
      </Pressable>
    </Card>
  );
}

const s = StyleSheet.create({
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#000",
  },
  body: {
    marginTop: 8,
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  img: {
    position: "absolute",
    right: 16,
    top: 20,
    width: 56,
    height: 56,
  },
  link: {
    marginTop: 8,
    color: "#1E90FF",
    fontWeight: "700",
  },
});
