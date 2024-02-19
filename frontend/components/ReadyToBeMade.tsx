import { View, Text, FlatList, ImageBackground } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { SheetManager } from "react-native-actions-sheet";

function throttle(cb: any, delay = 1000) {
  let shouldWait = false;

  return (...args: any) => {
    if (shouldWait) {
      return;
    }

    cb(...args);
    shouldWait = true;

    setTimeout(() => {
      shouldWait = false;
    }, delay);
  };
}

const handleShowRecipe = (name: String, imageURI: string, ingredients: any) => {
  SheetManager.show("recipe-ingredient-sheet", {
    payload: {
      recipe: {
        name: name,
        imageURI: imageURI,
        ingredients: ingredients,
      },
    },
  });
};

export default function ReadyToBeMade({ recipes }: any) {
  const RecipeItem = ({
    name,
    imageURI,
    ingredients,
  }: {
    name: string;
    imageURI: string;
    ingredients: any;
  }) => (
    <TouchableOpacity
      onPress={() => throttle(handleShowRecipe(name, imageURI, ingredients))}
    >
      <View
        className=" rounded-2xl m-[5] flex justify-end items-center overflow-hidden"
        style={{ width: 127, height: 210 }}
      >
        <ImageBackground
          style={{ width: "110%", height: "110%" }}
          source={{
            uri: imageURI,
          }}
        >
          <View
            className="w-full h-full justify-end items-center"
            style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
          >
            <Text className="text-white font-pps w-3/5 flex text-center pb-4">
              {name}
            </Text>
          </View>
        </ImageBackground>
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
            transform: [{ rotate: "20deg" }],
          }}
          contentFit="contain"
          source={require("../assets/images/Purply.png")}
        />
      </View>
      {/* list of recipe */}
      <View className="flex flex-row gap-[9px] overflow-hidden pb-[15px]">
        <FlatList
          horizontal
          data={recipes}
          renderItem={({ item, index }) => (
              <RecipeItem
                key={index}
                name={item.title}
                imageURI={item.image}
                ingredients={item.ingredient}
              />
          )}
          keyExtractor={(item, index) => item.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
