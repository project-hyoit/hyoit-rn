import GameHeader from "@/widgets/game/header";
import { MemoryGameCard } from "@/widgets/home";
import { router } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GameScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <ScrollView
        contentContainerStyle={s.content}
        showsVerticalScrollIndicator={false}
      >
        <GameHeader title="게임" />

        <MemoryGameCard
          title="카드 맞추기"
          body={
            "같은 모양의 카드쌍의 위치를 기억해서\n알맞은 카드끼리 뒤집으세요"
          }
          onPress={() => router.push("/game/memory")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 24,
    gap: 12,
  },
});
