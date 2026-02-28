import { Stack } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function PrivacyPolicyScreen() {
  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: "Privacy Policy" }} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title" style={styles.header}>
          Privacy Policy
        </ThemedText>

        <ThemedText style={styles.paragraph}>Last updated: Today</ThemedText>

        <ThemedText type="subtitle" style={styles.sectionHeader}>
          1. Information We Collect
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          This is a test application. We do not actively collect any personal
          information from you. Any data required for the functionality of this
          test app is stored locally on your device or handled securely by our
          payment processor (RevenueCat) for testing purposes only.
        </ThemedText>

        <ThemedText type="subtitle" style={styles.sectionHeader}>
          2. How We Use Your Information
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          Any information collected is used solely to demonstrate the
          functionality of the app, such as simulating purchases or managing
          local state. We do not sell or share any of your data with third
          parties.
        </ThemedText>

        <ThemedText type="subtitle" style={styles.sectionHeader}>
          3. Security
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          We take reasonable measures to protect your information. However,
          since this is a test environment, please do not input any real
          sensitive information or actual credit card details unless explicitly
          using a test card provided by Apple/Google.
        </ThemedText>

        <ThemedText type="subtitle" style={styles.sectionHeader}>
          4. Changes to This Policy
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          We may update this privacy policy from time to time. Since this is a
          test app, changes may occur without notice.
        </ThemedText>

        <ThemedText type="subtitle" style={styles.sectionHeader}>
          5. Contact Us
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          If you have any questions about this Privacy Policy, please contact
          the developer of this test application.
        </ThemedText>

        <ThemedView style={{ height: 40 }} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  header: {
    marginBottom: 8,
  },
  sectionHeader: {
    marginTop: 24,
    marginBottom: 8,
  },
  paragraph: {
    lineHeight: 24,
  },
});
