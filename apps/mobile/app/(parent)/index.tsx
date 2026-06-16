import { useAuthStore } from "@hyoit/auth";
import { Redirect } from "expo-router";

export default function ParentIndex() {
  const hasParentOnboarded = useAuthStore((s) => s.hasParentOnboarded);

  if (!hasParentOnboarded) {
    return <Redirect href="/(parent)/onboarding/child-info" />;
  }

  return <Redirect href="/(parent)/(tabs)" />;
}
