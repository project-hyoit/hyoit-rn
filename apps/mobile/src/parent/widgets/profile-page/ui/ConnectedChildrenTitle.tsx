import { StyleSheet, Text } from "react-native";

export default function ConnectedChildrenTitle() {
  return <Text style={styles.title}>연결된 자녀분</Text>;
}

const styles = StyleSheet.create({
  title: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Pretendard",
    marginLeft: 28,
  },
});
