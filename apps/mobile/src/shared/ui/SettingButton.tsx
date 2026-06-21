import IconCircleButton from "./IconCircleButton";

interface SettingButtonProps {
  onPress?: () => void;
}

export default function SettingButton({ onPress }: SettingButtonProps) {
  return <IconCircleButton iconName="gearshape" onPress={onPress} />;
}
