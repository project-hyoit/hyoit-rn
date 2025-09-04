import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>효잇</Text>
      <Pressable
        style={styles.kakao}
        onPress={() => router.push("/onboarding/user-info")}
      >
        <Text style={styles.kakaoText}>카카오 계정으로 간편 로그인</Text>
      </Pressable>
      <Text style={styles.caption}>카카오 계정으로만 로그인이 가능합니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  logo: { fontSize: 32, textAlign: "center", marginBottom: 40 },
  kakao: {
    backgroundColor: "#FEE500",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  kakaoText: { fontSize: 16, fontWeight: "600" },
  caption: { color: "#999", textAlign: "center", marginTop: 12, fontSize: 12 },
});
