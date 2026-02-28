import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { initRevenueCat } from "@/lib/revenuecat";
import { useEffect } from "react";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    initRevenueCat();
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
        <Stack.Screen
          name="paywall"
          options={{ presentation: "modal", title: "Upgrade" }}
        />
        <Stack.Screen
          name="privacy"
          options={{ presentation: "modal", title: "Privacy Policy" }}
        />
        <Stack.Screen
          name="terms"
          options={{ presentation: "modal", title: "Terms of Service" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
