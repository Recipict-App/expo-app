import { View, Text, ScrollView, FlatList, TextInput } from "react-native";
import { Image } from "expo-image";
import ActionSheet, { ActionSheetRef, ActionSheetProps } from "react-native-actions-sheet";
import React, { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import ReadyToBeMade from "../components/ReadyToBeMade";
import AlmostThere from "../components/AlmostThere";
import Explore from "../components/Explore";

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
  const actionSheetRef = useRef<ActionSheetRef>(null);


  return (
    <SafeAreaView className="bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className=" flex w-full px-[24px] py-[32px] overflow-visible min-h-screen items-center">
          {/* Recipe Header */}
          <View className="flex w-full justify-between flex-row items-center">
            <Text className="font-pps text-3xl">Recipe</Text>
            <TouchableOpacity
              onPress={() => {
                actionSheetRef.current?.show();
              }}
            >
              <Image
                style={{ width: 12, height: 16 }}
                source={require("../assets/icons/Save.svg")}
              />
            </TouchableOpacity>
          </View>

          {/* Search bar */}
          <View className="flex flex-row w-full rounded-2xl h-[48px] bg-[#F8F8F6] items-center">
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
      {/* Modal */}
      <ActionSheet ref={actionSheetRef} >
        {/* <ScrollView> */}
        <View className=" w-full h-[92%] rounded-t-5xl pt-[12px] flex items-center gap-4 px-[20]">
          <View
            style={{
              width: 124,
              height: 4,
              borderRadius: 10,
              backgroundColor: "#9F9F9F",
            }}
          />
          <Text className="font-pps text-2xl">Egg with Tomato</Text>
          {/* Image */}
          <View className=" bg-grey w-4/5 h-1/3 rounded-2xl"></View>
          {/* Summary */}
          <View className="w-full flex flex-row ">
            {/* Ingredients */}
            <View className=" flex h-[250px] w-[200px] items-center p-3">
              <Text className="font-pps text-base">Ingredients:</Text>
              <FlatList
                className="p-[10px]"
                data={dummyIngredients}
                renderItem={({ item }) => (
                  <View className="flex w-4/5 flex-row mx-2">
                    <Text className="font-ppr text-sm">- </Text>
                    <Text className="font-ppr text-sm">{item}</Text>
                  </View>
                )}
                showsVerticalScrollIndicator={true}
              />
            </View>
            {/* General Information */}
            <View className=" flex h-full w-[200px] space-y-2 p-3">
              <Text className="font-pps">Duration:</Text>
              <Text className="font-ppr">50 minutes</Text>
              <Text className="font-pps">Calories: </Text>
              <Text className="font-ppr">20 kcal</Text>
              <Text className="font-pps">Equipment(s): </Text>
              <Text className="font-ppr">Pan, Wok</Text>
            </View>
          </View>
          <View className="flex items-center w-full">
            <Text className="font-ppb text-lg">Instruction</Text>
            <FlatList
              className="p-[10px] w-full"
              data={dummyIngredients}
              renderItem={({ item }) => (
                <View className="flex w-4/5 flex-row mx-2">
                  <Text className="font-ppr text-sm">- </Text>
                  <Text className="font-ppr text-sm">{item}</Text>
                </View>
              )}
              showsVerticalScrollIndicator={true}
            />
          </View>
        </View>
        {/* </ScrollView> */}
      </ActionSheet>
    </SafeAreaView>
  );
}
