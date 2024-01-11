import {
  View,
  Text,
  ScrollView,
  FlatList,
  Button,
  Alert,
  ImageBackground,
} from "react-native";
import { Image } from "expo-image";
import React, { useRef } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { SheetManager } from "react-native-actions-sheet";

import { UserContext } from "../userContext";
import { useContext } from "react";

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

const handleShowRecipe = (name: String) => {
  console.log(name);
  SheetManager.show("recipe-ingredient-sheet", {
    payload: {
      recipe: {
        name: name,
      },
    },
  });
};

export default function ReadyToBeMade() {
  const { readyRecipes } = useContext(UserContext);

  const RecipeItem = ({
    name,
    imageURI,
  }: {
    name: string;
    imageURI: string;
  }) => (
    <TouchableOpacity onPress={() => throttle(handleShowRecipe(name))}>
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
          data={readyRecipes}
          renderItem={({ item, index }) => (
            <RecipeItem key={item.id} name={item.title} imageURI={item.image} />
          )}
          keyExtractor={(item) => item.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
