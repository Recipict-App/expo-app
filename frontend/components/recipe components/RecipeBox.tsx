import { View, Text } from "react-native";
import { ImageBackground, Image } from "expo-image";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SheetManager } from "react-native-actions-sheet";

export interface RecipeBoxProps {
  name: string;
  ingredients: any;
  duration: number;
  imageURI: string;
  equipment: string[];
  calories: string;
}
const handleShowRecipe = (
  name: String,
  imageURI: string,
  ingredients: any,
  duration: number,
  equipment: string[],
  calories: string
) => {
  SheetManager.show("recipe-ingredient-sheet", {
    payload: {
      recipe: {
        name: name,
        imageURI: imageURI,
        ingredients: ingredients,
        duration: duration,
        equipment: equipment,
        calories: calories,
      },
    },
  });
};

function throttle(cb: any, delay = 1000) {
  let shouldWait = false;

  return (...args: any) => {
    if (shouldWait) {
      return;
    }

    cb(...args);
    shouldWait = true;

    setTimeout(() => {
      shouldWait = false;
    }, delay);
  };
}

export const RecipeBox: React.FC<RecipeBoxProps> = ({
  name,
  ingredients,
  duration,
  imageURI,
  equipment,
  calories,
}) => {
  return (
    <View className="flex w-full h-[100] justify-between rounded-3xl bg-[#F8F8F6]">
      <TouchableOpacity
        className=" min-w-full min-h-full "
        onPress={() =>
          throttle(
            handleShowRecipe(
              name,
              imageURI,
              ingredients,
              duration,
              equipment,
              calories
            )
          )
        }
      >
        <View className="flex flex-row justify-between items-center w-full h-full p-[15px]">
          <View className="flex flex-row justify-center items-center">
            <View
              className=" rounded-2xl m-[5] flex justify-end items-center overflow-hidden"
              style={{ width: 80, height: 78 }}
            >
              <ImageBackground
                style={{
                  width: "100%",
                  height: "100%",
                }}
                source={{
                  uri: imageURI,
                }}
              />
            </View>
            <View className="flex ml-[10px]">
              <Text
                numberOfLines={1}
                className=" text-base font-pps text-clip max-w-[150px]"
              >
                {name}
              </Text>
              <Text className=" text-xs font-ppr">
                {ingredients.length} ingredients
              </Text>
              <Text className=" text-xs font-ppr">
                {duration !== -1
                  ? duration + " minutes"
                  : "Duration Not Available"}
              </Text>

              <Text className=" text-xs font-ppr">
                {calories ? calories + " calories/serving" : "Calories Not Available"}
              </Text>
            </View>
          </View>
          <Image
            style={{ width: 25, height: 25 }}
            source={require("../../assets/icons/ArrowRecipe.svg")}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
