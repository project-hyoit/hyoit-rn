import bananaCardsImg from "@/assets/images/banana-cards_02.png";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type GameEntryCardProps = {
  title: string;
  body: string;
  onPress: () => void;
};

export default function GameEntryCard({
  title,
  body,
  onPress,
}: GameEntryCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [s.container, pressed && s.containerPressed]}
      onPress={onPress}
      accessibilityRole="button"
    >
      <View style={s.textArea}>
        <Text style={s.title}>{title}</Text>
        <Text style={s.body}>{body}</Text>
      </View>

      <View style={s.imageArea}>
        <Image source={bananaCardsImg} style={s.image} resizeMode="contain" />
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  container: {
    position: "relative",
    minHeight: 210,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 26,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  containerPressed: {
    backgroundColor: "#EAF2FF",
    borderColor: "#5B8FF9",
  },

  textArea: {
    width: "70%",
    zIndex: 2,
  },

  title: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "900",
    color: "#111111",
    letterSpacing: -0.5,
  },

  body: {
    marginTop: 58,
    fontSize: 16,
    lineHeight: 30,
    fontWeight: "700",
    color: "#777777",
  },

  imageArea: {
    position: "absolute",
    right: 10,
    top: 12,
    width: 132,
    height: 132,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: "100%",
    height: "100%",
  },
});
