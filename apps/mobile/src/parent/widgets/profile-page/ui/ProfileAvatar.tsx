import mainProfileImg from "@/assets/profileimg/mainprofile.png";
import { IconSymbol } from "@/src/parent/shared/ui/IconSymbol";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

interface Props {
  onPressEdit: () => void;
}

export default function ProfileAvatar({ onPressEdit }: Props) {
  return (
    <View style={styles.avatarWrapper}>
      <Image source={mainProfileImg} style={styles.avatar} />

      <TouchableOpacity style={styles.editButton} onPress={onPressEdit}>
        <View style={styles.editIconCircle}>
          <IconSymbol name="pencil" size={18} color="#FFFFFF" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarWrapper: {
    position: "relative",
    marginTop: 24,
  },
  avatar: {
    width: 160,
    height: 160,
  },
  editButton: {
    position: "absolute",
    right: 5,
    bottom: 5,
  },
  editIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
  },
});
