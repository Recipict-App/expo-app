import { View, Text, FlatList } from "react-native";
import { Image } from "expo-image";
import React from "react";
import RecipeBoxBig from "./RecipeBoxBig";
import RecipeBoxBigSkeleton from "../skeletons/RecipeBoxBigSkeleton";

export default function AlmostThere({ recipes, isPending }: any) {
  return (
    <View className=" bg-[#FEC1A6] w-full h-[284] rounded-2xl mt-9 pt-[12px] justify-between flex">
      <View
        className="mr-[10px] flex flex-row justify-end"
        style={{ zIndex: 1 }}
      >
        <Text className=" font-pps text-2xl text-white text-right pr-1">
          Almost There
        </Text>
        <Image
          style={{
            position: "absolute",
            left: -20,
            top: -60,
            width: 117,
            height: 127,
            transform: [{ rotate: "20deg" }],
          }}
          contentFit="contain"
          source={require("../../assets/images/Orangy.png")}
        />
      </View>
      {/* list of recipe */}
      <View className="flex flex-row gap-[9px] overflow-hidden pb-[15px]">
        {!isPending ? (
          <FlatList
            horizontal
            data={recipes}
            renderItem={({ item, index }) => (
              <RecipeBoxBig
                key={index}
                name={item.title}
                imageURI={item.image}
                ingredients={item.totalIngredients}
                equipment={item.requiredEquipment}
                calories={item.calories}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <FlatList
            horizontal
            data={[1, 2, 3, 4]}
            renderItem={({ item, index }) => <RecipeBoxBigSkeleton />}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}
