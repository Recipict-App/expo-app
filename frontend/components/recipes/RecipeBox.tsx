import { View, Text, TouchableOpacity } from "react-native";
import { ImageBackground, Image } from "expo-image";
import React from "react";

import { SheetManager } from "react-native-actions-sheet";

import { useDebounceCallback } from "usehooks-ts";
import { recipeType } from "../../types/recipe-type";

export const RecipeBox = ({ recipe }: { recipe: recipeType }) => {
  const handleShowRecipe = () => {
    SheetManager.show("recipe-ingredient-sheet", {
      payload: {
        recipe: recipe,
      },
    });
  };

  const debouncedhandleShowRecipe = useDebounceCallback(handleShowRecipe, 500, {
    leading: true,
    trailing: false,
  });

  return (
    <TouchableOpacity
      className="flex w-full h-[100] justify-between rounded-3xl bg-[#f8f8f6]"
      onPress={debouncedhandleShowRecipe}
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
                uri: recipe.image,
              }}
            />
          </View>
          <View className="flex ml-[10px]">
            <Text
              numberOfLines={1}
              className=" text-base font-pps text-clip max-w-[150px]"
            >
              {recipe.title}
            </Text>
            <Text className=" text-xs font-ppr">
              {recipe.totalIngredients.length} ingredients
            </Text>
            <Text className=" text-xs font-ppr">
              {recipe.readyInMinutes
                ? recipe.readyInMinutes + " minutes"
                : "Duration Not Available"}
            </Text>

            <Text className=" text-xs font-ppr">
              {recipe.calories
                ? recipe.calories + " calories"
                : "Calories Not Available"}
            </Text>
          </View>
        </View>
        <Image
          style={{ width: 25, height: 25 }}
          source={require("../../assets/icons/ArrowRecipe.svg")}
        />
      </View>
    </TouchableOpacity>
  );
};