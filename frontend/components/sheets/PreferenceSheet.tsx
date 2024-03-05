import ActionSheet, {
  SheetProps,
  SheetManager,
} from "react-native-actions-sheet";

import { View, Text, TouchableOpacity } from "react-native";

const handleClose = () => {
  SheetManager.hide("edit-ingredients-sheet");
};

export default function PreferenceSheet(props: SheetProps) {
  return (
    <ActionSheet id={props.sheetId}>
      <View className="w-full h-fit min-h-[70%] py-2 items-center rounded-xl">
        {/* top bar */}
        <View
          style={{
            width: "50%",
            height: 4,
            borderRadius: 10,
            backgroundColor: "#9F9F9F",
          }}
        >
          <TouchableOpacity onPress={handleClose} />
        </View>

        <Text className="font-pps text-2xl text-center mt-6">
          Choose your diets
        </Text>


      </View>
    </ActionSheet>
  );
}
