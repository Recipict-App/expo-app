import { useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

import ActionSheet, {
  ActionSheetRef,
  SheetProps,
  SheetManager,
} from "react-native-actions-sheet";

import { IngredientProps, Ingredient } from "../Ingredient";

export default function ScannedItemsSheet(props: SheetProps) {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const handleDelete = () => {
    SheetManager.hide("scanned-items-sheet");
  };
  const handleAdd = () => {};

  console.log("------- Log from ScannedItemSheet -------");
  console.log(props.payload);
  console.log("------------------");

  return (
    <ActionSheet id={props.sheetId}>
      <View className="max-h-[92%]">
        <View className="flex items-center gap-2 pt-2 pb-4">
          {/* Blackbar */}
          <View className="w-32 h-1 bg-[#9F9F9F] rounded-xl" />
          {/* Title */}
          <Text className="font-ppr text-xl">Scanned Items</Text>
        </View>

        <ScrollView>
          <View className="flex items-center gap-4 pt-2">
            {/* Scrollllll */}
            <View style={{ gap: 12 }} className="justify-center w-10/12 flex">
              {props.payload?.items?.map((item: IngredientProps) => (
                <Ingredient
                  key={Math.floor(Math.random() * 9999)}
                  name={item.name || "Unknown"}
                  quantity={item.quantity || "1 (default)"}
                  duration={item.duration || "1 days (default)"}
                />
              ))}

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
