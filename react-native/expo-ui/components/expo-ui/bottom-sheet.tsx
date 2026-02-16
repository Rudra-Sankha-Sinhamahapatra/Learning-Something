import { BottomSheet, Host, Text as SwiftUIText } from "@expo/ui/swift-ui";
import React from "react";
import {
    Button,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import { commonStyles } from "./styles";

export default function ExpoUIBottomSheet() {
  const { width } = useWindowDimensions();
  const [isOpened, setIsOpened] = React.useState(false);
  return (
    <View style={commonStyles.view}>
      <Text style={commonStyles.title}>2. Bottom Sheet Example</Text>
      <Button title="Open Bottom Sheet" onPress={() => setIsOpened(true)} />

      <Host style={{ position: "absolute", width }}>
        <BottomSheet
          isOpened={isOpened}
          onIsOpenedChange={(e) => setIsOpened(e)}
        >
          <SwiftUIText>Hello, world!</SwiftUIText>
        </BottomSheet>
      </Host>
    </View>
  );
}

const styles = StyleSheet.create({});
