import { View, Text } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RecipeBoxProps, RecipeBox } from "./RecipeBox";

const dummyRecipePreview: RecipeBoxProps[] = [
  { name: "Butter Chicken", ingredients: 5, duration: 50, calories: 500 },
  { name: "Pandan Chicken", ingredients: 2, duration: 30, calories: 510 },
  { name: "Apple Pie", ingredients: 6, duration: 120, calories: 2500 },
  { name: "Pumpkin Pie", ingredients: 3, duration: 140, calories: 50 },
];

export default function Explore() {
  return (
    <View className="flex items-center mt-[50px] w-full">
      {/* Explore Header */}
      <View
        className="flex justify-center items-start pl-[23] mb-14 w-4/5"
        style={{
          height: 66,
          borderRadius: 20,
          backgroundColor: "#A4C893",
          shadowColor: "rgba(0, 0, 0, 0.25)",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowRadius: 50,
          shadowOpacity: 1,
        }}
      >
        <Text className=" font-pps text-2xl text-white">Explore</Text>
        <Image
          style={{
            position: "absolute",
            right: -20,
            top: -30,
            width: 122,
            height: 128,
            zIndex: 1,
          }}
          contentFit="contain"
          source={require("../assets/images/Satay.png")}
        />
      </View>
      <View className="w-full flex" style={{ gap: 10 }}>
        {dummyRecipePreview.map((item, index) => {
          return (
            <RecipeBox
              key={index}
              name={item.name}
              duration={item.duration}
              ingredients={item.ingredients}
              calories={item.calories}
            />
          );
        })}
      </View>
    </View>
  );
}
