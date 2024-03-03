import { View, Text, FlatList } from "react-native";
import { Image } from "expo-image";
import React from "react";

import RecipeBoxBig from "./RecipeBoxBig";
import RecipeBoxBigSkeleton from "../skeletons/RecipeBoxBigSkeleton";
import { recipeType } from "../../types/recipe-type";

export default function ReadyToBeMade({
  recipes,
  isPending,
}: {
  recipes: recipeType[] | undefined;
  isPending: boolean;
}) {
  return (
    <View className=" bg-[#BCBBFF] w-full h-[284] rounded-2xl mt-9 pt-[12px] justify-between flex">
      <View className="ml-[2vw] flex flex-row" style={{ zIndex: 1 }}>
        <Text className="font-pps text-2xl text-white">Ready To Be Made</Text>
        <Image
          style={{
            position: "absolute",
            right: -40,
            top: -50,
            width: 120,
            height: 106,
            zIndex: 1,
            transform: [{ rotate: "20deg" }],
          }}
          contentFit="contain"
          source={require("../../assets/images/Purply.png")}
        />
      </View>
      {/* list of recipe */}
      <View className="flex flex-row overflow-hidden pb-[15px] justify-center">
        {!isPending ? (
          recipes?.length !== 0 ? (
            <FlatList
              horizontal
              data={recipes}
              renderItem={({ item }) => <RecipeBoxBig recipe={item} />}
              keyExtractor={(index) => index.toString()}
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <View className="flex justify-center items-center h-full w-[65%] rounded-2xl pb-10">
              <Text className="font-ppr text-base text-[#605dfd] text-center">
                No recipes ready to be made
              </Text>
            </View>
          )
        ) : (
          <>
            <FlatList
              horizontal
              data={[1, 2, 3, 4]}
              renderItem={() => <RecipeBoxBigSkeleton />}
              keyExtractor={(index) => index.toString()}
              showsHorizontalScrollIndicator={false}
            />
          </>
        )}
      </View>
    </View>
  );
}
