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
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SheetManager } from "react-native-actions-sheet";

import { UserContext } from "../userContext";
import { useContext } from "react";

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

const handleShowRecipe = (name: String, imageURI: string) => {
  // console.log(name);
  SheetManager.show("recipe-ingredient-sheet", {
    payload: {
      recipe: {
        name: name,
        imageURI: imageURI
      },
    },
  });
};

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

const RecipeItem = ({ name, imageURI }: { name: string; imageURI: string }) => (
  <TouchableOpacity onPress={() => throttle(handleShowRecipe(name, imageURI))}>
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

export default function AlmostThere() {
  const recipePreview = [1, 2, 3, 4];
  const { userData, setUserData, missingRecipes } = useContext(UserContext);
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
          source={require("../assets/images/Orangy.png")}
        />
      </View>
      {/* list of recipe */}
      <View className="flex flex-row gap-[9px] overflow-hidden pb-[15px]">
        <FlatList
          horizontal
          data={missingRecipes}
          renderItem={({ item }) => (
            <RecipeItem key={item.id} name={item.title} imageURI={item.image} />
          )}
          keyExtractor={(item) => item.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
