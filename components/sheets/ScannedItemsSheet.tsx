import { View, Text } from "react-native";
import ActionSheet, { SheetProps } from "react-native-actions-sheet";

export default function ScannedItemsSheet(props: SheetProps) {
  return (
    <ActionSheet id={props.sheetId}>
      <View className="h-[200] w-full bg-green">
        <Text>ScannedItemsSheet</Text>
      </View>
    </ActionSheet>
  );
}
