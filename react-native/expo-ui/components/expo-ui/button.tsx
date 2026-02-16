import { Button, Host, Text as SwiftUIText } from "@expo/ui/swift-ui";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { commonStyles } from "./styles";

export default function ExpoUIButton() {
  const [editingProfile, setEditingProfile] = React.useState(false);
  return (
    <View style={commonStyles.view}>
      <Text style={commonStyles.title}>3. Button Example</Text>
      <Host style={styles.hostStyle}>
        <Button
          variant="default"
          onPress={() => {
            setEditingProfile((editingProfile) => !editingProfile);
          }}
        >
          <SwiftUIText>
            {editingProfile ? "Cancel" : "Edit profile"}
          </SwiftUIText>
        </Button>
      </Host>
    </View>
  );
}

const styles = StyleSheet.create({
  hostStyle: {
    width: "100%",
    height: 50,
  },
});
