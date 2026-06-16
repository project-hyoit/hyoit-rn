import { useOnboardingStore } from "@/src/parent/entities/auth/model/onboarding.store";
import { router } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const MIN_AGE = 1;
const MAX_AGE = 100;
const ITEM_HEIGHT = 72;
const VISIBLE_COUNT = 3;
const DEFAULT_AGE = 21;

export default function AgeInfoScreen() {
  const { age, set } = useOnboardingStore();
  const initialAge = useMemo(
    () => (age && Number(age) >= MIN_AGE && Number(age) <= MAX_AGE ? Number(age) : DEFAULT_AGE),
    [age]
  );
  const [selectedAge, setSelectedAge] = useState(initialAge);
  const scrollRef = useRef<ScrollView>(null);
  const ages = useMemo(
    () => Array.from({ length: MAX_AGE - MIN_AGE + 1 }, (_, index) => MIN_AGE + index),
    []
  );

  useEffect(() => {
    if (!age) {
      set({ age: String(DEFAULT_AGE) });
    }
  }, [age, set]);

  useEffect(() => {
    set({ age: String(selectedAge) });
  }, [selectedAge, set]);

  useEffect(() => {
    const index = Math.min(Math.max(selectedAge - MIN_AGE, 0), ages.length - 1);
    scrollRef.current?.scrollTo({ y: index * ITEM_HEIGHT, animated: false });
  }, [ages.length, selectedAge]);

  const handleScrollEnd = (offsetY: number) => {
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const nextAge = Math.min(Math.max(MIN_AGE + index, MIN_AGE), MAX_AGE);
    setSelectedAge(nextAge);
  };

  return (
    <View style={s.wrap}>
      <Text style={s.title} allowFontScaling={false}>
        이번에는{"\n"}연세를 알려주세요!
      </Text>
      <Text style={s.subtitle} allowFontScaling={false}>
        가족이 부모님을 더 잘 이해할 수 있도록{"\n"}연세 정보를 입력해 주세요.
      </Text>

      <View style={s.pickerWrap}>
        <View style={s.pickerContent} pointerEvents="none">
          <View style={s.pickerOverlay} />
        </View>

        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          scrollEventThrottle={16}
          onMomentumScrollEnd={(event) => {
            handleScrollEnd(event.nativeEvent.contentOffset.y);
          }}
          onScrollEndDrag={(event) => {
            handleScrollEnd(event.nativeEvent.contentOffset.y);
          }}
          contentContainerStyle={s.scrollContainer}
        >
          {ages.map((item) => (
            <View key={item} style={s.ageItem}>
              <Text
                style={item === selectedAge ? s.ageTextActive : s.ageText}
                allowFontScaling={false}
              >
                {item}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={s.nextRow}>
        <Pressable
          style={({ pressed }) => [
            s.next,
            pressed && { opacity: 0.9 },
          ]}
          onPress={() => router.push("/(parent)/onboarding/verify-code")}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="다음"
        >
          <Text style={s.nextText} allowFontScaling={false}>
            다음
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const COLORS = {
  border: "#E6E7F0",
  label: "#454545",
  text: "#000000",
  inactiveText: "rgba(0, 0, 0, 0.35)",
  activeText: "#1E90FF",
  primary: "#1E90FF",
  bg: "#FFFFFF",
  panel: "#F8F9FF",
};

const s = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    marginTop: 46,
    marginBottom: 12,
    lineHeight: 40,
  },
  subtitle: {
    color: "rgba(0, 0, 0, 0.6)",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
  },
  pickerWrap: {
    marginTop: 40,
    height: ITEM_HEIGHT * VISIBLE_COUNT,
    justifyContent: "center",
  },
  pickerContent: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  pickerOverlay: {
    position: "absolute",
    width: "100%",
    height: ITEM_HEIGHT,
    borderRadius: 18,
    backgroundColor: "rgba(30, 144, 255, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(30, 144, 255, 0.25)",
  },
  scrollContainer: {
    paddingTop: ITEM_HEIGHT,
    paddingBottom: ITEM_HEIGHT,
  },
  ageItem: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  ageText: {
    fontSize: 26,
    color: COLORS.inactiveText,
    fontWeight: "600",
  },
  ageTextActive: {
    fontSize: 32,
    color: COLORS.activeText,
    fontWeight: "800",
  },
  nextRow: {
    marginTop: "auto",
    alignItems: "flex-end",
    marginBottom: 64,
  },
  next: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 15,
    width: "100%",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 2 },
    }),
  },
  nextText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "500",
  },
});
