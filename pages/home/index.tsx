import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "@/shared/theme/colors";
import {
  ActionBarDual,
  AskBanner,
  ChatbotCard,
  HomeHeader,
  MemoryGameCard,
  MetricCard,
  WeatherCard,
} from "@/widgets/home";

export default function HomeScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.bg }}
      edges={["top"]}
    >
      <ScrollView
        contentContainerStyle={s.container}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader title="시작" />

        <AskBanner
          title={"요즘 활동량이 적어졌는데\n어디 편찮으신 건 아니죠?"}
          ctaLabel="쥐돌이에게 물어보기"
          onPress={() => router.push("/(tabs)/chat")}
        />

        <ActionBarDual
          left={{
            label: "쥐돌이와 대화",
            onPress: () => router.push("/(tabs)/chat"),
          }}
          right={{
            label: "게임하기",
            onPress: () => router.push("/(tabs)/game"),
          }}
        />

        <View style={s.row}>
          <View style={s.col}>
            <WeatherCard temp={22} summary="맑음" />
          </View>
          <View style={s.col}>
            <MetricCard
              title="주간 활동량"
              message={"활동량이 점점 줄어들고 있어요.\n짧은 산책 어떠세요?"}
              data={[72, 55, 35, 37, 27, 18]}
            />
          </View>
        </View>

        <View style={s.row}>
          <View style={s.col}>
            <MetricCard
              title="게임 점수"
              message={
                "게임 점수가 점점 오르고 있어요\n기억력이 어느정도 늘어나셨나요?"
              }
              data={[10, 14, 18, 15, 22, 28]}
              reverseBars
            />
          </View>
          <View style={s.col}>
            <ChatbotCard onPress={() => router.push("/(tabs)/chat")} />
          </View>
        </View>

        {/* 1열: 카드 맞추기 */}
        <MemoryGameCard onPress={() => router.push("/(tabs)/game")} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 16,
  },
  row: { flexDirection: "row", gap: 16 },
  col: { flex: 1 },
});
