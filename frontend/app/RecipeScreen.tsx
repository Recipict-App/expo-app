import { useContext, useState } from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import ReadyToBeMade from "../components/recipes/ReadyToBeMade";
import AlmostThere from "../components/recipes/AlmostThere";
import { SheetManager } from "react-native-actions-sheet";

import { UserContext } from "../userContext";
import { useFetchRecommendedRecipes } from "../api/queries";
import { searchRecipes } from "../api/RecipeFunctions";
import { recipeType } from "../types/recipe-type";

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

  const [query, setQuery] = useState<string>("");

  const handleShowSavedRecipe = () => {
    SheetManager.show("saved-recipes-sheet");
  };

  const handleSearch = async () => {
    const requestBody = {
      subscription: userDetails.subscription,
      query: query,
    };
    setQuery("");
    const { newRecipes }: { newRecipes: recipeType[] } = await searchRecipes(
      requestBody
    );
    console.log("search recipes:" + newRecipes);
    console.log("-------------------------");
    SheetManager.show("search-recipes-sheet", {
      payload: {
        recipes: newRecipes,
      },
    });
  };

  const handleChange = (e: any) => {
    setQuery(e);
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
            <TouchableOpacity onPress={handleShowSavedRecipe}>
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
              // autoCorrect={true}
              onSubmitEditing={handleSearch}
              value={query}
              onChangeText={handleChange}
            />
          </View>

          <ReadyToBeMade
            recipes={data?.newReadyRecipes}
            isPending={isPending}
          />
          <AlmostThere
            recipes={data?.newMissingRecipes}
            isPending={isPending}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
