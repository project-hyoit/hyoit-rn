import oldManImg from "@/src/entry/assets/images/choose/oldman.png";
import oldWomanImg from "@/src/entry/assets/images/choose/oldwoman.png";
import youngManImg from "@/src/entry/assets/images/choose/youngman.png";
import youngWomanImg from "@/src/entry/assets/images/choose/youngwoman.png";
import { useChooseRoleAction } from "@hyoit/auth";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { BG, PRIMARY, TEXT } from "@/src/entry/shared/config/theme";
import { navigateToTarget } from "@/src/entry/shared/lib/router";

type SelectedRole = "parent" | "child" | null;

export default function ChoosePage() {
  const [selectedRole, setSelectedRole] = useState<SelectedRole>(null);

  const { submit, isPending, error } = useChooseRoleAction({
    onSuccess: (result) => {
      if (result.role === "parent") {
        navigateToTarget("parent");
        return;
      }

      navigateToTarget("child");
    },
  });

  const handleConfirm = () => {
    if (!selectedRole || isPending) return;

    submit(selectedRole);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>어떤 분이 사용하시나요?</Text>

      <View style={styles.roleList}>
        <Pressable
          style={[
            styles.roleButton,
            selectedRole === "parent" && styles.selectedButton,
          ]}
          onPress={() => setSelectedRole("parent")}
        >
          <View style={styles.imageRow}>
            <Image style={styles.oldWoman} source={oldWomanImg} />
            <Image style={styles.oldMan} source={oldManImg} />
          </View>

          <Text
            style={[
              styles.roleText,
              selectedRole === "parent" && styles.selectedRoleText,
            ]}
          >
            부모님
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.roleButton,
            selectedRole === "child" && styles.selectedButton,
          ]}
          onPress={() => setSelectedRole("child")}
        >
          <View style={styles.imageRow}>
            <Image style={styles.youngWoman} source={youngWomanImg} />
            <Image style={styles.youngMan} source={youngManImg} />
          </View>

          <Text
            style={[
              styles.roleText,
              selectedRole === "child" && styles.selectedRoleText,
            ]}
          >
            자녀
          </Text>
        </Pressable>
      </View>

      <Pressable
        style={[
          styles.confirmButton,
          selectedRole && !isPending && styles.activeConfirmButton,
        ]}
        onPress={handleConfirm}
        disabled={!selectedRole || isPending}
      >
        <Text style={styles.confirmText}>
          {isPending ? "처리 중..." : "확인"}
        </Text>
      </Pressable>

      {error ? (
        <Text style={styles.errorText}>역할 선택에 실패했어요.</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingHorizontal: 24,
  },
  title: {
    marginTop: 97,
    marginBottom: 120,
    fontSize: 24,
    fontWeight: "600",
    color: TEXT,
  },
  roleList: {
    flexDirection: "row",
    gap: 20,
  },
  roleButton: {
    width: 160,
    padding: 8,
    paddingTop: 28,
    paddingBottom: 28,
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    backgroundColor: "#FFFFFF",
  },
  imageRow: {
    flexDirection: "row",
  },
  selectedButton: {
    borderColor: PRIMARY,
    backgroundColor: "#EEF6FF",
  },
  roleText: {
    color: TEXT,
    fontSize: 20,
    fontWeight: "600",
  },
  selectedRoleText: {
    color: PRIMARY,
    fontWeight: "700",
  },
  confirmButton: {
    backgroundColor: "#D9D9D9",
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: "auto",
    marginBottom: 96,
  },
  activeConfirmButton: {
    backgroundColor: PRIMARY,
  },
  confirmText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  errorText: {
    marginTop: 12,
    color: "#FF4757",
    fontSize: 14,
    textAlign: "center",
  },
  oldWoman: {
    width: 76,
    height: 57,
    resizeMode: "contain",
    marginBottom: 27,
  },
  oldMan: {
    width: 70,
    height: 57,
    resizeMode: "contain",
    marginLeft: 4,
  },
  youngWoman: {
    width: 70,
    height: 65,
    resizeMode: "contain",
  },
  youngMan: {
    width: 70,
    height: 57,
    resizeMode: "contain",
    marginLeft: 10,
    marginBottom: 27,
  },
});
