import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useQuickQuestions } from "../../features/chat/quick-questions";
import { ChatDock, ChatHeader, MessageList, QuickStartPanel } from "./ui";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "아래있는 질문을 클릭해서 대화를 시작해보세요",
    },
  ]);

  const quick = useQuickQuestions();

  const push = (role: Message["role"], text: string) =>
    setMessages((prev) => [...prev, { role, content: text }]);

  const send = (text: string) => {
    push("user", text);

    setTimeout(() => {
      push(
        "assistant",
        "가까운 공원에 가서 천천히 걸어보는 건 어때요? 바람 쐬면 한층 나아져요."
      );
    }, 250);
  };

  return (
    <SafeAreaView style={s.safeArea}>
      <View style={s.wrap}>
        <ChatHeader />
        <QuickStartPanel items={quick} onPick={send} />

        <View style={s.messageArea}>
          <MessageList items={messages} />
        </View>

        <ChatDock onSend={send} onVoice={(text) => send(text)} />
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F7F9",
  },
  wrap: {
    flex: 1,
    gap: 12,
    padding: 16,
  },
  messageArea: {
    flex: 1,
  },
});
