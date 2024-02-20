import { useContext } from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import ReadyToBeMade from "../components/recipe components/ReadyToBeMade";
import AlmostThere from "../components/recipe components/AlmostThere";
import { SheetManager } from "react-native-actions-sheet";

import { UserContext } from "../userContext";
import { useFetchRecommendedRecipes } from "../api/queries";

export default function recipe() {
  const { userData } = useContext(UserContext);
  if (!userData) return null;
  const userDetails = userData[0];

  const ingredientsString = userDetails.ingredients
    .map((ingredient) => ingredient.genericName)
    .join(",");
  const cuisinesString = userDetails.preferences.cuisine.join(",");
  const dietsString = userDetails.preferences.diet.join(",");

  const requestBody = {
    ingredients: ingredientsString,
    subscription: userDetails.subscription,
    mode: "min-missing-ingredient",
    cuisines: cuisinesString,
    diets: dietsString,
  };

  const { isPending, error, data, refetch } =
    useFetchRecommendedRecipes(requestBody);

  const handleShowRecipe = () => {
    SheetManager.show("saved-recipes-sheet");
  };

  return (
    <SafeAreaView
      className="bg-white"
      style={{ paddingBottom: 0 }}
      edges={["top", "right", "left"]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className=" flex w-full px-[24px] py-[32px] overflow-visible items-center">
          {/* Recipe Header */}
          <View className="flex w-full justify-between flex-row items-center">
            <Text className="font-pps text-3xl">Recipe</Text>
            <TouchableOpacity onPress={handleShowRecipe}>
              <Image
                style={{ width: 12, height: 16 }}
                source={require("../assets/icons/Save.svg")}
              />
            </TouchableOpacity>
          </View>

          {/* Search bar */}
          <View className="flex flex-row w-full rounded-2xl h-[48px] bg-[#F8F8F6] items-center mt-3">
            <Image
              className="flex w-[20px] h-[20px] object-contain justify-center ml-5"
              source={require("../assets/icons/Search.svg")}
            />
            <TextInput
              className="flex ml-4 font-ppr text-sm w-full"
              placeholder="Search"
            />
          </View>

          <ReadyToBeMade recipes={data?.newReadyRecipes} isPending={isPending} />
          <AlmostThere recipes={data?.newMissingRecipes} isPending={isPending} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
