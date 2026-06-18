import { StyleSheet, Text, View } from "react-native";

export default function CheckInPage() {
  return (
    <View style={s.container}>
      <Text style={s.title}>안부</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    padding: 24,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111111",
  },
});
