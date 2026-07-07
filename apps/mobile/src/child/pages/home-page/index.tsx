import { router } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HyoitLogo from "@/src/parent/assets/login/hyoit_logo_home.png";
import { NotificationButton, SettingButton } from "@/src/shared/ui";

export default function ChildHomePage() {
  const moveToCheckIn = () => {
    router.push("/(child)/(tabs)/check-in");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.topRow}>
            <Image source={HyoitLogo} style={styles.logo} resizeMode="contain" />

            <View style={styles.iconRow}>
              <NotificationButton
                hasNotification
                onPress={moveToCheckIn}
              />
              <SettingButton onPress={() => {}} />
            </View>
          </View>

          <View style={styles.titleArea}>
            <Text style={styles.title}>오늘도 반가워요, 00님</Text>
            <Text style={styles.subtitle}>부모님께 따뜻한 안부를 전해요.</Text>
          </View>
        </View>

        <Pressable style={styles.statusBanner} onPress={moveToCheckIn}>
          <View style={styles.statusTextArea}>
            <Text style={styles.statusLabel}>새 안부 도착!</Text>
            <Text style={styles.statusTitle}>부모님이 안부를 보냈어요</Text>
            <Text style={styles.statusDescription}>
              확인 버튼을 누르면 부모님이 안심할 수 있어요.
            </Text>
            <Text style={styles.statusCta}>확인하러 가기</Text>
          </View>

          <View style={styles.characterArea}>
            <View style={styles.bubble}>
              <Text style={styles.bubbleText}>💌</Text>
            </View>
            <View style={styles.characterPlaceholder}>
              <Text style={styles.characterText}>효잇</Text>
            </View>
          </View>
        </Pressable>

        <Pressable style={styles.primaryAction} onPress={moveToCheckIn}>
          <Text style={styles.primaryIcon}>✈️</Text>
          <Text style={styles.primaryLabel}>부모님께 안부 보내기</Text>
          <Text style={styles.primaryArrow}>›</Text>
        </Pressable>

        <View style={styles.grid}>
          <FeatureCard
            eyebrow="오늘의 안부"
            title="받은 안부"
            description={"부모님이 보낸\n안부를 확인해요."}
            ctaLabel="확인하기"
            backgroundColor="#F3EEFF"
            ctaColor="#6D45C7"
            visual="💬"
            badgeCount={1}
            onPress={moveToCheckIn}
          />
          <FeatureCard
            eyebrow="빠른 답장"
            title="잘 지내요"
            description={"한 번 누르면\n바로 안부를 보내요."}
            ctaLabel="보내기"
            backgroundColor="#EFFFF4"
            ctaColor="#25874E"
            visual="✅"
            onPress={moveToCheckIn}
          />
          <FeatureCard
            eyebrow="가족 연결"
            title="부모님 정보"
            description={"연결된 부모님을\n확인해요."}
            ctaLabel="보기"
            backgroundColor="#FFF7DC"
            ctaColor="#7A5A00"
            visual="👪"
            onPress={() => {}}
          />
          <FeatureCard
            eyebrow="도움말"
            title="효잇 사용 방법"
            description={"궁금한 내용을\n확인할 수 있어요."}
            ctaLabel="바로가기"
            backgroundColor="#FFF0E8"
            ctaColor="#EF6A2E"
            visual="🎧"
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type FeatureCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  backgroundColor: string;
  ctaColor: string;
  visual: string;
  badgeCount?: number;
  onPress: () => void;
};

function FeatureCard({
  eyebrow,
  title,
  description,
  ctaLabel,
  backgroundColor,
  ctaColor,
  visual,
  badgeCount,
  onPress,
}: FeatureCardProps) {
  return (
    <Pressable style={[styles.featureCard, { backgroundColor }]} onPress={onPress}>
      {typeof badgeCount === "number" && badgeCount > 0 && (
        <View style={styles.featureBadge}>
          <Text style={styles.featureBadgeText}>{badgeCount}</Text>
        </View>
      )}
      <Text style={[styles.featureEyebrow, { color: ctaColor }]}>{eyebrow}</Text>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
      <View style={styles.featureBottomRow}>
        <Text style={[styles.featureCta, { color: ctaColor }]}>{ctaLabel}</Text>
        <Text style={styles.featureVisual}>{visual}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 22,
    paddingBottom: 132,
    gap: 14,
  },
  header: {
    paddingTop: 14,
    marginBottom: 2,
  },
  topRow: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    width: 72,
    height: 42,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  titleArea: {
    marginTop: 18,
    gap: 6,
  },
  title: {
    fontSize: 31,
    lineHeight: 40,
    fontWeight: "900",
    color: "#050505",
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "800",
    color: "#8A8A8A",
  },
  statusBanner: {
    position: "relative",
    minHeight: 316,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#66B4FF",
    backgroundColor: "#EEF5FF",
    paddingTop: 30,
    paddingLeft: 24,
    paddingRight: 18,
    overflow: "visible",
  },
  statusTextArea: {
    width: "58%",
    zIndex: 2,
  },
  statusLabel: {
    marginBottom: 6,
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "900",
    color: "#1478FF",
  },
  statusTitle: {
    fontSize: 28,
    lineHeight: 38,
    fontWeight: "900",
    color: "#050505",
  },
  statusDescription: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 23,
    fontWeight: "800",
    color: "#58769A",
  },
  statusCta: {
    marginTop: 28,
    fontSize: 17,
    lineHeight: 23,
    fontWeight: "900",
    color: "#1478FF",
  },
  characterArea: {
    position: "absolute",
    right: -12,
    bottom: 20,
    width: 210,
    height: 210,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bubble: {
    position: "absolute",
    top: 24,
    left: 28,
    zIndex: 2,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  bubbleText: {
    fontSize: 24,
  },
  characterPlaceholder: {
    width: 142,
    height: 142,
    borderRadius: 71,
    backgroundColor: "rgba(255, 255, 255, 0.72)",
    alignItems: "center",
    justifyContent: "center",
  },
  characterText: {
    fontSize: 25,
    fontWeight: "900",
    color: "#6AA9FF",
  },
  primaryAction: {
    height: 63,
    borderRadius: 16,
    backgroundColor: "#0A84FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    paddingHorizontal: 18,
  },
  primaryIcon: {
    fontSize: 27,
  },
  primaryLabel: {
    flex: 1,
    textAlign: "center",
    fontSize: 22,
    lineHeight: 29,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  primaryArrow: {
    fontSize: 32,
    lineHeight: 34,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  featureCard: {
    width: "48%",
    minHeight: 176,
    borderRadius: 14,
    padding: 16,
    overflow: "visible",
  },
  featureBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FF5C72",
    alignItems: "center",
    justifyContent: "center",
  },
  featureBadgeText: {
    fontSize: 15,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  featureEyebrow: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "900",
  },
  featureTitle: {
    marginTop: 8,
    fontSize: 21,
    lineHeight: 27,
    fontWeight: "900",
    color: "#111111",
  },
  featureDescription: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "800",
    color: "#666666",
  },
  featureBottomRow: {
    marginTop: "auto",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  featureCta: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "900",
  },
  featureVisual: {
    fontSize: 35,
  },
});
