import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { type SymbolWeight } from "expo-symbols";
import { ComponentProps } from "react";
import {
  type OpaqueColorValue,
  type StyleProp,
  type TextStyle,
} from "react-native";

type IconMapping = Record<string, ComponentProps<typeof MaterialIcons>["name"]>;
type IconSymbolName = keyof typeof MAPPING;

const MAPPING = {
  "house.fill": "home",
  "gamecontroller.fill": "sports-esports",
  "text.bubble.fill": "chat-bubble",
  "person.fill": "person",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  "bell.fill": "notifications-none",
  "square.fill": "stop",
  pencil: "edit",
} as const satisfies IconMapping;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <MaterialIcons
      name={MAPPING[name]}
      size={size}
      color={color}
      style={[
        {
          includeFontPadding: false,
          lineHeight: size + 2,
          textAlign: "center",
        },
        style,
      ]}
    />
  );
}
