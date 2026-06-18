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
  visual?: string;
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
  visual,
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
          <Text style={s.visualText}>{visual}</Text>
        )}
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  container: {
    position: "relative",
    height: 210,
    borderRadius: 20,
    paddingTop: 18,
    paddingLeft: 18,
    paddingRight: 14,
    paddingBottom: 14,
    overflow: "visible",
  },

  textArea: {
    zIndex: 2,
  },

  eyebrow: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
    color: "#666666",
    letterSpacing: -0.2,
  },

  title: {
    marginTop: 8,
    fontSize: 21,
    lineHeight: 27,
    fontWeight: "900",
    color: "#111111",
    letterSpacing: -0.4,
  },

  description: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "700",
    color: "#777777",
    letterSpacing: -0.2,
  },

  cta: {
    alignSelf: "flex-start",
    marginTop: 13,
    minHeight: 30,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255, 255, 255, 0.65)",
  },

  ctaText: {
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "900",
  },

  visualArea: {
    position: "absolute",
    right: -8,
    bottom: 14,
    width: 92,
    height: 92,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  visualText: {
    fontSize: 58,
    lineHeight: 70,
  },

  badge: {
    position: "absolute",
    top: 12,
    right: 6,
    zIndex: 3,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#1478FF",
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "900",
    color: "#FFFFFF",
  },
});
