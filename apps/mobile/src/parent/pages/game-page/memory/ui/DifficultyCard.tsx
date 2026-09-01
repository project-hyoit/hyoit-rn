import type { ImageSourcePropType } from "react-native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const PRIMARY = "#1E90FF";

type Props = {
  label: string;
  image: ImageSourcePropType;
  headline: string;
  selected?: boolean;
  onPress?: () => void;
};

export default function DifficultyCard({
  label,
  image,
  headline,
  selected = false,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "#e9f2ff" }}
      style={({ pressed }) => [
        s.wrap,
        pressed && { opacity: 0.98 },
        selected && s.wrapSelected,
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <View style={[s.imageWrap, selected && s.imageWrapSelected]}>
        <Image source={image} style={s.image} resizeMode="cover" />
      </View>

      <View style={s.textCol}>
        <Text style={[s.label, selected && s.labelSel]} allowFontScaling={false}>
          {label}
        </Text>
        <Text
          style={[s.headline, selected && s.textSel]}
          allowFontScaling={false}
        >
          {headline}
        </Text>
      </View>

      <View style={[s.checkbox, selected && s.checkboxSel]}>
        {selected ? <Text style={s.tick}>✓</Text> : null}
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    paddingHorizontal: 22,
    paddingVertical: 18,
    borderRadius: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  wrapSelected: {
    backgroundColor: PRIMARY,
  },
  label: {
    fontSize: 21,
    fontWeight: "900",
    color: "#111",
  },
  labelSel: { color: "#fff" },

  imageWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: "hidden",
    backgroundColor: "#EEF7D8",
  },
  imageWrapSelected: {
    backgroundColor: "#DCEBFF",
  },
  image: {
    width: "100%",
    height: "100%",
  },

  textCol: { flex: 1 },
  headline: { fontSize: 15, color: "#111", fontWeight: "700" },
  textSel: { color: "#fff" },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  checkboxSel: {
    backgroundColor: "#1E90FF",
    borderColor: "#fff",
  },
  tick: {
    color: "#fff",
    fontSize: 18,
    lineHeight: 20,
    fontWeight: "900",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
