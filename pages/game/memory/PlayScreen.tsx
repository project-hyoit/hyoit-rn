import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function PlayScreen() {
  const { level, secs } = useLocalSearchParams<{
    level?: string;
    secs?: string;
  }>();
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <Text>난이도: {level}</Text>
      <Text>제한 시간: {secs}s</Text>
      <Pressable onPress={() => router.back()}>
        <Text style={{ marginTop: 12 }}>← 뒤로</Text>
      </Pressable>
    </View>
  );
}
