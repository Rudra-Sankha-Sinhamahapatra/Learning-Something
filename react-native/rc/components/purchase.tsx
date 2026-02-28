import { Link } from "expo-router";
import { Button, StyleSheet, View } from "react-native";
import RevenueCatUI from "react-native-purchases-ui";
import { ThemedText } from "./themed-text";

export default function PaywallScreen() {
  const openPaywall = async () => {
    try {
      await RevenueCatUI.presentPaywall();
    } catch (error) {
      console.error("Paywall error:", error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Button title="Open Paywall" onPress={openPaywall} />

      <View style={styles.linksContainer}>
        <Link href="/privacy">
          <ThemedText style={styles.link}>Privacy Policy</ThemedText>
        </Link>
        <ThemedText> • </ThemedText>
        <Link href="/terms">
          <ThemedText style={styles.link}>Terms of Service</ThemedText>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  linksContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 20,
  },
  link: {
    color: "#0a7ea4",
    textDecorationLine: "underline",
  },
});
