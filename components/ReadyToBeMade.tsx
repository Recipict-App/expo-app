import { View, Text, ScrollView, FlatList } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const RecipeItem = () => (
  <TouchableOpacity>
    <View className="bg-[#444141] w-[127px] h-[210px] rounded-[20px] m-[5] flex justify-end items-center">
      <Text className="text-white font-pps w-3/5 flex text-center pb-4">
        Eggs with Tomato
      </Text>
    </View>
  </TouchableOpacity>
);

export default function ReadyToBeMade() {
  const recipePreview = [1, 2, 3, 4];
  return (
    <View className=" bg-[#BCBBFF] w-[341] h-[284] rounded-2xl mt-9 pt-[12px] justify-between flex">
      <View className="ml-[10px] flex flex-row" style={{ zIndex: 1 }}>
        <Text className="font-pps text-xl text-white pl-1">
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
    </View>
  );
}
