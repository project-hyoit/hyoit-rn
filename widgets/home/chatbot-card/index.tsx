import Card from "@/shared/ui/Card";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

type Props = {
  title: string;
  body: string;
  ctaLabel: string;
  image?: ImageSourcePropType;
  onPress(): void;
};

export default function ChatbotCard({
  title,
  body,
  ctaLabel,
  image = require("@/assets/images/character_02.png"),
  onPress,
}: Props) {
  return (
    <Card style={s.card}>
      <Text style={s.title} allowFontScaling={false}>
        {title}
      </Text>
      <Text style={s.body} allowFontScaling={false}>
        {body}
      </Text>
      <Image source={image} style={s.img} />
      <Pressable onPress={onPress} hitSlop={8}>
        <Text style={s.link} allowFontScaling={false}>
          {ctaLabel} ▶
        </Text>
      </Pressable>
    </Card>
  );
}

const s = StyleSheet.create({
  card: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    marginBottom: 40,
  },
  title: { fontSize: 18, fontWeight: "800", color: "#000" },
  body: { marginTop: 10, fontSize: 14, color: "#333", lineHeight: 20 },
  img: {
    position: "absolute",
    right: 8,
    top: 32,
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  link: { marginTop: 8, color: "#1E90FF", fontWeight: "700" },
});
