import { View, Text, ScrollView, FlatList } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import ReadyToBeMade from "../components/ReadyToBeMade";
import AlmostThere from "../components/AlmostThere";

const RecipeItem = () => (
  <TouchableOpacity>
    <View className="bg-[#444141] w-[127px] h-[210px] rounded-[20px] m-[5] flex justify-end items-center">
      <Text className="text-white font-pps w-3/5 flex text-center">
        Eggs with Tomato
      </Text>
    </View>
  </TouchableOpacity>
);

export default function recipe() {
  const recipePreview = [1, 2, 3, 4];
  return (
    <SafeAreaView className="bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          className=" flex w-full p-[20px] pt-[40px] overflow-visible min-h-screen"
          style={{ gap: 20 }}
        >
          <View className="flex w-full justify-between flex-row items-center">
            <Text className="font-ppb text-3xl">Recipe</Text>
            <TouchableOpacity>
              <Image
                style={{ width: 12, height: 16 }}
                source={require("../assets/icons/Save.svg")}
              />
            </TouchableOpacity>
          </View>

          <ReadyToBeMade />

          <AlmostThere />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
