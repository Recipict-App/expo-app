import { useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

import ActionSheet, {
  ActionSheetRef,
  SheetProps,
  SheetManager,
} from "react-native-actions-sheet";

import { ingredientProps, ingredientTypes } from "../../firebase-type";
import { Shelf } from "../Shelf";

export default function ScannedItemsSheet(props: SheetProps) {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  // Button handlers
  const handleDelete = () => {
    SheetManager.hide("scanned-items-sheet");
  };
  const handleAdd = async () => {
    
  };

  console.log("------- Log from ScannedItemSheet -------");
  console.log(props.payload.items);
  console.log("-----------------------------------------");

  // Group items by type for display
  function groupByType(objectArray: Array<ingredientProps>) {
    return objectArray.reduce(function (acc: any, obj: ingredientProps) {
      var key = obj["type"];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }
  const groupedItems = groupByType(props.payload.items);
  console.log("🚀 ~ ScannedItemsSheet ~ groupedItems:", groupedItems);

  return (
    <ActionSheet id={props.sheetId}>
      <View className="max-h-[92%]">
        {/* Header */}
        <View className="flex items-center gap-2 pt-2 pb-4">
          {/* Blackbar */}
          <View className="w-32 h-1 bg-[#9F9F9F] rounded-xl" />
          {/* Title */}
          <Text className="font-ppr text-xl">Scanned Items</Text>
        </View>

        <ScrollView>
          <View className="flex items-center gap-4 pt-2">
            {/* Scroll */}
            <View
              style={{ gap: 12 }}
              className="justify-center items-center w-10/12 flex"
            >
              {/* Dispay items */}
              {Object.keys(groupedItems).map(function (key) {
                return (
                  <Shelf
                    key={key}
                    category={key}
                    ingredients={groupedItems[key]}
                  />
                );
              })}

              {/* Buttons */}
              <View className=" h-fit flex flex-row space-x-7 pb-1 pt-4 justify-center">
                <TouchableOpacity onPress={handleDelete}>
                  <Image
                    className="w-[56px] h-[56px]"
                    contentFit="contain"
                    source={require("../../assets/icons/DeleteIngredient.svg")}
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleAdd}>
                  <Image
                    className="w-[56px] h-[56px]"
                    contentFit="contain"
                    source={require("../../assets/icons/ApproveIngredient.svg")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </ActionSheet>
  );
}
