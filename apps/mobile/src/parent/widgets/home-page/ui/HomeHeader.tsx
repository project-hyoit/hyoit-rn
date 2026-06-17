import { SymbolView } from "expo-symbols";
import { Pressable, StyleSheet, Text, View } from "react-native";

type HomeHeaderProps = {
  name: string;
  hasNotification?: boolean;
  onPressNotification: () => void;
  onPressSetting: () => void;
};

export default function HomeHeader({
  name,
  hasNotification = true,
  onPressNotification,
  onPressSetting,
}: HomeHeaderProps) {
  return (
    <View style={s.container}>
      <View style={s.topRow}>
        <Text style={s.logo}>효잇</Text>

        <View style={s.iconRow}>
          <Pressable style={s.iconButton} onPress={onPressNotification}>
            {hasNotification && <View style={s.notificationDot} />}

            <SymbolView
              name="bell"
              size={24}
              tintColor="#4A4A4A"
              fallback="🔔"
            />
          </Pressable>

          <Pressable style={s.iconButton} onPress={onPressSetting}>
            <SymbolView
              name="gearshape"
              size={24}
              tintColor="#4A4A4A"
              fallback="⚙️"
            />
          </Pressable>
        </View>
      </View>

      <View style={s.titleArea}>
        <Text style={s.title}>오늘도 반가워요, {name}님 ☺️</Text>
        <Text style={s.subtitle}>효잇이 따뜻한 연결을 도와드려요.</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    gap: 18,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "900",
    color: "#6AA9FF",
  },

  iconRow: {
    flexDirection: "row",
    gap: 12,
  },

  iconButton: {
    position: "relative",
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  notificationDot: {
    position: "absolute",
    top: 9,
    right: 11,
    zIndex: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#1478FF",
  },

  titleArea: {
    gap: 8,
  },

  title: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "900",
    color: "#050505",
    letterSpacing: -0.6,
  },

  subtitle: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "800",
    color: "#888888",
  },
});
