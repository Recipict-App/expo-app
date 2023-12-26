import { View, Text } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SheetManager } from "react-native-actions-sheet";
export interface RecipeBoxProps {
  name: string;
  ingredients: number;
  duration: number;
  calories: number;
  image?: Image;
}
const handleShowRecipe = () => {
    SheetManager.show("recipe-ingredient-sheet");
  };
export const RecipeBox: React.FC<RecipeBoxProps> = ({
  name,
  ingredients,
  duration,
  calories,
}) => {
  return (
    <View className="flex w-full h-[100] justify-between rounded-3xl bg-[#F8F8F6]">
      <TouchableOpacity className=" min-w-full min-h-full " onPress={handleShowRecipe}>
        <View className="flex flex-row justify-between items-center w-full h-full p-[15px]">
          <View className="flex flex-row justify-center items-center">
            <View
              style={{
                width: 80,
                height: 78,
                borderRadius: 15,
                backgroundColor: "#D9D9D9",
              }}
            />
            <View className="flex px-[24px] ml-[10px]">
              <Text
                numberOfLines={1}
                className=" text-base font-pps text-clip max-w-[125px]"
              >
                {name}
              </Text>
              <Text className=" text-xs font-ppr">
                {ingredients} ingredients
              </Text>
              <Text className=" text-xs font-ppr">{duration} minutes</Text>
              <Text className=" text-xs font-ppr">{calories} kcal</Text>
            </View>
          </View>
          <Image
            style={{ width: 25, height: 25 }}
            source={require("../assets/icons/ArrowRecipe.svg")}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
