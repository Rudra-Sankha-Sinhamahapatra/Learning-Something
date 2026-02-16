import { Host, Slider } from "@expo/ui/swift-ui";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { commonStyles } from "./styles";

export default function ExpoUISlider() {
  const [value, setValue] = React.useState(0);
  return (
    <View style={commonStyles.view}>
      <Text style={commonStyles.title}> 1. Slider</Text>
      <Host style={{ minHeight: 60 }} matchContents>
        <Slider
          value={value}
          onValueChange={(value) => {
            setValue(value);
          }}
        />
      </Host>
      <Text style={styles.value}>Value: {value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  value: {
    fontSize: 20,
    fontWeight: "normal",
    color: "indigo",
    textAlign: "center",
  },
});
