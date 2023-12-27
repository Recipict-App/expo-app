import { View, Text, ScrollView, FlatList, TextInput } from "react-native";
import { Image } from "expo-image";
import ActionSheet, { ActionSheetRef, ActionSheetProps } from "react-native-actions-sheet";
import React, { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import ReadyToBeMade from "../components/ReadyToBeMade";
import AlmostThere from "../components/AlmostThere";
import Explore from "../components/Explore";
import { SheetManager } from "react-native-actions-sheet";

const dummyIngredients = [
  "Garlic",
  "Chili",
  "Rice",
  "Dany",
  "Other spices idk what but a long one",
  "Recipict",
  "Purply",
  "Orangy",
  "Bowly",
  "Satay",
];

export default function recipe() {

  const handleShowRecipe = () => {
    SheetManager.show("saved-recipes-sheet");
  };
  
  return (
    <View className="bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className=" flex w-full px-[24px] py-[32px] overflow-visible items-center ">
          {/* Recipe Header */}
          <View className="flex w-full justify-between flex-row items-center">
            <Text className="font-pps text-3xl">Recipe</Text>
            <TouchableOpacity
              onPress={handleShowRecipe}
            >
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
              className="flex ml-4 font-ppr text-sm w-full py-4 "
              placeholder="Search"
            />
          </View>

          <ReadyToBeMade />

          <AlmostThere />

          <Explore />
        </View>
      </ScrollView>
    </View>
  );
}
