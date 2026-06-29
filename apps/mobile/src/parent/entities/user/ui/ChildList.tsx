import { StyleSheet, Text, View } from "react-native";
import type { ChildUser } from "../model/types";
import ChildCard from "./ChildCard";

interface ChildListProps {
  items?: ChildUser[];
}

export default function ChildList({ items = [] }: ChildListProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>연결된 가족</Text>
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
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    color: "#1B1B1F",
    fontFamily: "Pretendard",
  },
});
