import Card from "@/shared/ui/Card";
import React from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";

type Props = { onPress(): void };

export default function ChatbotCard({ onPress }: Props) {
  return (
    <Card style={s.card}>
      <Text style={s.title}>챗봇 쥐돌이</Text>
      <Text style={s.body}>
        쥐돌이에게{"\n"}
        궁금한 것을{"\n"}
        간단히 설명해주면{"\n"}
        무엇이든 대답해 줄 수 있어요
      </Text>
      <Image source={require("@/assets/images/character.png")} style={s.img} />
      <Pressable onPress={onPress}>
        <Text style={s.link}>쥐돌이에게 질문하기 ▶</Text>
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
    top: 40,
    width: 72,
    height: 72,
  },
  link: {
    marginTop: 8,
    color: "#1E90FF",
    fontWeight: "700",
  },
});
