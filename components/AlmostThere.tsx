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

export default function AlmostThere() {
  const recipePreview = [1, 2, 3, 4];
  return (
    <View className=" bg-[#FEC1A6] w-[341] h-[284] rounded-2xl mt-9 pt-[12px] justify-between flex">
      <View
        className="mr-[10px] flex flex-row justify-end"
        style={{ zIndex: 1 }}
      >
        <Text className=" font-pps text-xl text-white text-right pr-1">
          Almost There
        </Text>
        <Image
          style={{
            position: "absolute",
            left: -20,
            top: -60,
            width: 117,
            height: 127,
            resizeMode: "contain",
            transform: [{ rotate: "20deg" }],
          }}
          source={require("../assets/images/Orangy.png")}
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
