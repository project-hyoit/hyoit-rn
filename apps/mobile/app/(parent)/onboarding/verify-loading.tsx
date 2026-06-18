import { useLocalSearchParams } from "expo-router";
import VerifyLoadingScreen from "@/src/parent/widgets/onboarding-page/ui/VerifyLoadingScreen";

export default function VerifyLoadingRoute() {
  const { codeInput } = useLocalSearchParams<{ codeInput?: string }>();
  return <VerifyLoadingScreen codeInput={codeInput} />;
}
