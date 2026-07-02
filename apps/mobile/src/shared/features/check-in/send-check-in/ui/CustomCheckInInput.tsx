import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

interface CustomCheckInInputProps {
  onSend: (message: string) => void;
}

export default function CustomCheckInInput({
  onSend,
}: CustomCheckInInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    onSend(trimmedMessage);
    setMessage("");
  };

  return (
    <View style={s.container}>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="직접 입력하기 (선택)"
        placeholderTextColor="#B0B0B0"
        style={s.input}
        returnKeyType="send"
        onSubmitEditing={handleSend}
      />

      {message.trim().length > 0 && (
        <Pressable style={s.sendButton} onPress={handleSend}>
          <Text style={s.sendText}>전송</Text>
        </Pressable>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    minHeight: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,

    shadowColor: "#000000",
    shadowOpacity: 0.04,
    shadowRadius: 7,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 1,
  },

  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    color: "#222222",
    paddingVertical: 0,
  },

  sendButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#1478FF",
  },

  sendText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFFFFF",
  },
});
