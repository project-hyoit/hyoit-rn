import { StyleSheet, Text, View } from "react-native";
import type { ChildUser } from "../model/types";
import ChildCard from "./ChildCard";

interface ChildListProps {
  items?: ChildUser[];
}

export default function ChildList({ items = [] }: ChildListProps) {
  const title = items.length === 1 ? `연결된 자녀 ${items[0].name}` : "연결된 자녀";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {items.map((child) => (
        <ChildCard
          key={child.id}
          name={child.name}
          phone={child.phone}
          isOnline={child.isOnline}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    color: "#1B1B1F",
    fontFamily: "Pretendard",
    paddingLeft: 18,
  },
});
