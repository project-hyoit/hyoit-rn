import { Pressable, StyleSheet, Text, View } from "react-native";

import { HOME_STATUS_CONTENT } from "../constants/homeStatus";
import type { HomeStatus } from "../types/home";

type HomeStatusBannerProps = {
  status: HomeStatus;
  onPress: () => void;
};

export default function HomeStatusBanner({
  status,
  onPress,
}: HomeStatusBannerProps) {
  const content = HOME_STATUS_CONTENT[status];

  return (
    <Pressable
      style={[
        s.container,
        {
          backgroundColor: content.backgroundColor,
          borderColor: content.borderColor,
        },
      ]}
      onPress={onPress}
    >
      {content.badgeText && content.badgeColor && (
        <View style={[s.badge, { backgroundColor: content.badgeColor }]}>
          <Text style={s.badgeText}>{content.badgeText}</Text>
        </View>
      )}

      <View style={s.textArea}>
        {content.label && (
          <Text style={[s.label, { color: content.ctaColor }]}>
            {content.label}
          </Text>
        )}

        <Text style={[s.title, { color: content.textColor }]}>
          {content.title}
        </Text>

        <Text style={[s.description, { color: content.descriptionColor }]}>
          {content.description}
        </Text>

        <Text style={[s.cta, { color: content.ctaColor }]}>
          {content.ctaLabel}
        </Text>
      </View>

      <View style={s.characterPlaceholder}>
        <Text style={s.characterText}>효잇</Text>
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  container: {
    position: "relative",
    minHeight: 225,
    borderRadius: 14,
    borderWidth: 1,
    paddingTop: 28,
    paddingLeft: 22,
    paddingRight: 18,
    overflow: "hidden",
  },

  textArea: {
    width: "63%",
    zIndex: 2,
  },

  label: {
    marginBottom: 8,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "900",
  },

  title: {
    fontSize: 28,
    lineHeight: 37,
    fontWeight: "900",
    letterSpacing: -0.5,
  },

  description: {
    marginTop: 9,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "800",
  },

  cta: {
    marginTop: 26,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "900",
  },

  characterPlaceholder: {
    position: "absolute",
    right: 16,
    bottom: 18,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    alignItems: "center",
    justifyContent: "center",
  },

  characterText: {
    fontSize: 24,
    fontWeight: "900",
    color: "#6AA9FF",
  },

  badge: {
    position: "absolute",
    top: -9,
    right: -9,
    zIndex: 4,
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "900",
    color: "#FFFFFF",
  },
});
