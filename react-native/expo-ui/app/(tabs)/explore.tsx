import ExpoUIBottomSheet from "@/components/expo-ui/bottom-sheet";
import ExpoUIButton from "@/components/expo-ui/button";
import ExpoUISlider from "@/components/expo-ui/slider";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function TabTwoScreen() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ flex: 1 }}>
      <View style={{ flex: 1, gap: 10 }}>
        <Text style={{ fontSize: 20, color: "indigo", fontWeight: "bold" }}>
          {" "}
          Expo UI Components
        </Text>
        <View style={{ flex: 1, gap: 10 }}>
          <ExpoUISlider />
          <ExpoUIBottomSheet />
          <ExpoUIButton />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
