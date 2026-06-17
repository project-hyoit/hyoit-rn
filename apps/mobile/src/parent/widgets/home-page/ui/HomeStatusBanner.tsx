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

      <View style={s.characterArea}>
        <View style={s.bubble}>
          <Text style={s.bubbleText}>💙</Text>
        </View>

        <View style={s.characterPlaceholder}>
          <Text style={s.characterText}>효잇</Text>
        </View>
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  container: {
    position: "relative",
    height: 392,
    borderRadius: 14,
    borderWidth: 1,
    paddingTop: 36,
    paddingLeft: 26,
    paddingRight: 20,
    overflow: "hidden",
  },

  textArea: {
    width: "58%",
    zIndex: 2,
  },

  label: {
    marginBottom: 8,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "900",
  },

  title: {
    fontSize: 32,
    lineHeight: 44,
    fontWeight: "900",
    letterSpacing: -0.8,
  },

  description: {
    marginTop: 11,
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "800",
    letterSpacing: -0.3,
  },

  cta: {
    marginTop: 33,
    fontSize: 19,
    lineHeight: 25,
    fontWeight: "900",
    letterSpacing: -0.3,
  },

  characterArea: {
    position: "absolute",
    right: 8,
    bottom: 18,
    width: 240,
    height: 245,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  bubble: {
    position: "absolute",
    top: 18,
    left: 24,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  bubbleText: {
    fontSize: 26,
  },

  characterPlaceholder: {
    width: 185,
    height: 185,
    borderRadius: 92.5,
    backgroundColor: "rgba(255, 255, 255, 0.72)",
    alignItems: "center",
    justifyContent: "center",
  },

  characterText: {
    fontSize: 30,
    fontWeight: "900",
    color: "#6AA9FF",
  },

  badge: {
    position: "absolute",
    top: -14,
    right: -10,
    zIndex: 4,
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    fontSize: 24,
    lineHeight: 29,
    fontWeight: "900",
    color: "#FFFFFF",
  },
});
