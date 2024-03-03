import { View, Text, FlatList } from "react-native";
import { Image } from "expo-image";
import React from "react";
import RecipeBoxBig from "./RecipeBoxBig";
import RecipeBoxBigSkeleton from "../skeletons/RecipeBoxBigSkeleton";
import { recipeType } from "../../types/recipe-type";

export default function AlmostThere({
  recipes,
  isPending,
}: {
  recipes: recipeType[] | undefined;
  isPending: boolean;
}) {
  return (
    <View className=" bg-[#FEC1A6] w-full h-[284] rounded-2xl mt-9 pt-[12px] justify-between flex">
      <View
        className="mr-[2vw] flex flex-row justify-end"
        style={{ zIndex: 1 }}
      >
        <Text className=" font-pps text-2xl text-white text-right">
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
      <View className="flex flex-row overflow-hidden pb-[15px] justify-center">
        {!isPending ? (
          <FlatList
            horizontal
            data={recipes}
            renderItem={({ item }) => <RecipeBoxBig recipe={item} />}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <FlatList
            horizontal
            data={[1, 2, 3, 4]}
            renderItem={() => <RecipeBoxBigSkeleton />}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}
