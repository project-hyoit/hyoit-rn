import { useAuthStore } from "@hyoit/auth";
import { Redirect } from "expo-router";

export default function ChildIndex() {
  const hasChildOnboarded = useAuthStore((s) => s.hasChildOnboarded);

  if (!hasChildOnboarded) {
    return <Redirect href="/(child)/onboarding/parent-info" />;
  }

  return <Redirect href="/(child)/(tabs)" />;
}
