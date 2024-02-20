import { View, Text, FlatList } from "react-native";
import { Image } from "expo-image";
import React from "react";

import RecipeBoxBig from "./RecipeBoxBig";
import RecipeBoxBigSkeleton from "../skeletons/RecipeBoxBigSkeleton";

export default function ReadyToBeMade({ recipes, isPending }: any) {
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
            transform: [{ rotate: "20deg" }],
          }}
          contentFit="contain"
          source={require("../../assets/images/Purply.png")}
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
          <>
            <FlatList
              horizontal
              data={[1, 2, 3, 4]}
              renderItem={({ item, index }) => <RecipeBoxBigSkeleton />}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
            />
          </>
        )}
      </View>
    </View>
  );
}
