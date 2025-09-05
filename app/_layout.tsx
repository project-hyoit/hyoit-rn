import { LightTheme } from "@/shared/config/theme";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

export const unstable_settings = { initialRouteName: "login" };

const useAuth = () => ({ isSignedIn: false });

export default function RootLayout() {
  const theme = LightTheme;
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const { isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inTabs = segments[0] === "(tabs)";
    if (!isSignedIn && inTabs) {
      router.replace("/login");
    }
  }, [isSignedIn, segments, router]);

  if (!loaded) return null;

  return (
    <ThemeProvider value={theme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
