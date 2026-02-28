import { Stack } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function TermsOfServiceScreen() {
  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: "Terms of Service" }} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title" style={styles.header}>
          Terms of Service
        </ThemedText>

        <ThemedText style={styles.paragraph}>Last updated: Today</ThemedText>

        <ThemedText type="subtitle" style={styles.sectionHeader}>
          1. Acceptance of Terms
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          By accessing and using this test application, you agree to be bound by
          these Terms of Service. If you do not agree to these terms, please do
          not use the application.
        </ThemedText>

        <ThemedText type="subtitle" style={styles.sectionHeader}>
          2. Description of Service
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          This is a test application provided for educational and developmental
          purposes. It demonstrates implementations such as RevenueCat
          integrations. The service is provided "as is" without any warranties.
        </ThemedText>

        <ThemedText type="subtitle" style={styles.sectionHeader}>
          3. User Conduct
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          You agree not to use the application for any illegal or unauthorized
          purpose. You must not attempt to exploit, hack, or otherwise
          compromise the security of the application or its underlying services.
        </ThemedText>

        <ThemedText type="subtitle" style={styles.sectionHeader}>
          4. Purchases and Payments
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          Any purchases made within this application are simulated using sandbox
          environments (e.g., Apple Sandbox, Google Play Testing) and do not
          result in real financial transactions. Please use provided test cards
          only.
        </ThemedText>

        <ThemedText type="subtitle" style={styles.sectionHeader}>
          5. Limitation of Liability
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          The developer shall not be liable for any direct, indirect,
          incidental, or consequential damages resulting from the use or
          inability to use the application.
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
