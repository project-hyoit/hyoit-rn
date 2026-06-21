import IconCircleButton from "./IconCircleButton";

interface NotificationButtonProps {
  hasNotification?: boolean;
  onPress?: () => void;
}

export default function NotificationButton({
  hasNotification = false,
  onPress,
}: NotificationButtonProps) {
  return (
    <IconCircleButton
      iconName="bell"
      hasDot={hasNotification}
      onPress={onPress}
    />
  );
}
