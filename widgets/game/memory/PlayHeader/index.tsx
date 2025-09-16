import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  title: string; // ex) "쉬움 난이도"
  hearts: number; // ex) 8
  onBack?: () => void;
};

export default function PlayHeader({ title, hearts, onBack }: Props) {
  const { top } = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[s.wrap, { paddingTop: top + 8 }]}>
      <Pressable onPress={onBack ?? router.back} hitSlop={16} style={s.left}>
        <Text style={s.back}>◀</Text>
      </Pressable>

      <Text style={s.title}>{title}</Text>

      <View style={s.right}>
        <Text style={s.heart}>💗</Text>
        <Text style={s.heartCount}>× {hearts}</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  left: { width: 40, alignItems: "flex-start" },
  back: { fontSize: 18 },
  title: { flex: 1, fontSize: 18, fontWeight: "700" },
  right: {
    minWidth: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  heart: { fontSize: 18, marginRight: 4 },
  heartCount: { fontSize: 18, fontWeight: "700" },
});
