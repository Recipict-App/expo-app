import { View, Text } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RecipeBoxProps, RecipeBox } from "./RecipeBox";

import { UserContext } from "../userContext";
import { useContext } from "react";

export default function Explore() {
  const { randomRecipes } = useContext(UserContext);
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
        {randomRecipes.map((item:any, index:any) => {
          return (
            <RecipeBox
              key={index}
              name={item.title}
              duration={item.readyInMinutes}
              ingredients={item.totalIngredients.length}
              imageURI={item.image}
            />
          );
        })}
      </View>
    </View>
  );
}
