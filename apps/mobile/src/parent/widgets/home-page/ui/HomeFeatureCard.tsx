import type { ImageSourcePropType } from "react-native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type HomeFeatureCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  image?: ImageSourcePropType;
  backgroundColor: string;
  ctaColor: string;
  badgeCount?: number;
  onPress: () => void;
};

export default function HomeFeatureCard({
  eyebrow,
  title,
  description,
  ctaLabel,
  image,
  backgroundColor,
  ctaColor,
  badgeCount,
  onPress,
}: HomeFeatureCardProps) {
  return (
    <Pressable
      style={[
        s.container,
        {
          backgroundColor,
        },
      ]}
      onPress={onPress}
    >
      <View style={s.textArea}>
        <Text style={s.eyebrow}>{eyebrow}</Text>
        <Text style={s.title}>{title}</Text>
        <Text style={s.description}>{description}</Text>

        <View style={[s.cta, { borderColor: ctaColor }]}>
          <Text style={[s.ctaText, { color: ctaColor }]}>{ctaLabel}</Text>
          <Text style={[s.ctaText, { color: ctaColor }]}>›</Text>
        </View>
      </View>

      <View style={s.visualArea}>
        {badgeCount ? (
          <View style={s.badge}>
            <Text style={s.badgeText}>{badgeCount}</Text>
          </View>
        ) : null}

        {image ? (
          <Image source={image} style={s.image} resizeMode="contain" />
        ) : (
          <View style={s.placeholder} />
        )}
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  container: {
    position: "relative",
    minHeight: 168,
    borderRadius: 20,
    padding: 18,
    overflow: "hidden",
  },

  textArea: {
    zIndex: 2,
  },

  eyebrow: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
    color: "#6B6B6B",
  },

  title: {
    marginTop: 8,
    fontSize: 21,
    lineHeight: 27,
    fontWeight: "900",
    color: "#111111",
    letterSpacing: -0.3,
  },

  description: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    color: "#7B7B7B",
  },

  cta: {
    alignSelf: "flex-start",
    marginTop: 14,
    minHeight: 30,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },

  ctaText: {
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "900",
  },

  visualArea: {
    position: "absolute",
    right: 8,
    bottom: 8,
    width: 86,
    height: 86,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  placeholder: {
    width: "100%",
    height: "100%",
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.55)",
  },

  badge: {
    position: "absolute",
    top: -8,
    right: -2,
    zIndex: 3,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#1478FF",
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFFFFF",
  },
});
