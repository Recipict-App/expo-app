import { View, Text, ScrollView, FlatList, Button, Alert } from "react-native";
import { Image } from "expo-image";
import React, { useRef } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import ActionSheet, {
  ActionSheetRef,
  ActionSheetProps,
} from "react-native-actions-sheet";

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
export default function ReadyToBeMade() {
  const recipePreview = [1, 2, 3, 4];
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const RecipeItem = () => (
    <TouchableOpacity
      onPress={() => {
        actionSheetRef.current?.show();
      }}
    >
      <View className="bg-[#444141] w-[127px] h-[210px] rounded-[20px] m-[5] flex justify-end items-center">
        <Text className="text-white font-pps w-3/5 flex text-center pb-4">
          Eggs with Tomato
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className=" bg-[#BCBBFF] w-full h-[284] rounded-2xl mt-9 pt-[12px] justify-between flex">
      <View className="ml-[10px] flex flex-row" style={{ zIndex: 1 }}>
        <Text className="font-pps text-2xl text-white pl-1">
          Ready To Be Made
        </Text>
        <Image
          style={{
            position: "absolute",
            right: -30,
            top: -50,
            width: 120,
            height: 106,
            zIndex: 1,
            resizeMode: "contain",
            transform: [{ rotate: "20deg" }],
          }}
          source={require("../assets/images/Purply.png")}
        />
      </View>
      {/* list of recipe */}
      <View className="flex flex-row gap-[9px] overflow-hidden pb-[15px]">
        <FlatList
          horizontal
          data={recipePreview}
          renderItem={({ item }) => <RecipeItem key={item} />}
          keyExtractor={(item) => item.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {/* Modal */}
      <ActionSheet ref={actionSheetRef}>
        <View className=" w-full h-[92%] rounded-t-5xl pt-[12px] flex items-center gap-4 px-[20]">
          <View
            style={{
              width: 124,
              height: 4,
              borderRadius: 10,
              backgroundColor: "#9F9F9F",
            }}
          />
          <Text className="font-pps text-2xl">Eggs with Tomato</Text>
          {/* Image */}
          <View className=" bg-grey w-4/5 h-1/3 rounded-2xl"></View>
          {/* Summary */}
          <View className="w-full flex flex-row ">
            {/* Ingredients */}
            <View className=" flex h-[350px] w-[200px] items-center p-3">
              <Text className="font-pps text-lg">Ingredients:</Text>
              <FlatList
                className="p-[10px]"
                data={dummyIngredients}
                renderItem={({ item }) => (
                  <View className="flex w-4/5 flex-row mx-2">
                    <Text className="font-ppr text-base">- </Text>
                    <Text className="font-ppr text-base">{item}</Text>
                  </View>
                )}
                showsVerticalScrollIndicator={true}
              />
            </View>
            {/* General Information */}
            <View className=" flex h-full w-[200px] space-y-2 p-3">
              <Text className="font-pps text-base">Duration:</Text>
              <Text className="font-ppr text-base">50 minutes</Text>
              <Text className="font-pps text-base">Calories: </Text>
              <Text className="font-ppr text-base">20 kcal</Text>
              <Text className="font-pps text-base">Equipment(s): </Text>
              <Text className="font-ppr text-base">Pan, Wok</Text>
            </View>
            
          </View>
        </View>
      </ActionSheet>
    </View>
  );
}
