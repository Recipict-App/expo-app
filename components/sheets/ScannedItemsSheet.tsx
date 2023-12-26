import { View, Text } from "react-native";
import React from "react";
import ActionSheet, { SheetProps } from "react-native-actions-sheet";

export default function ScannedItemsSheet(props: SheetProps) {
  return (
    <ActionSheet id={props.sheetId}>
      <View>
        <Text>ScannedItemsSheet</Text>
      </View>
    </ActionSheet>
  );
}
