import { View, Text } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

export interface RecipeBoxProps {
  name: string;
  ingredients: number;
  duration: number;
  calories: number;
  image?: Image;
}

const dummyRecipePreview: RecipeBoxProps[] = [
  { name: "Butter Chicken", ingredients: 5, duration: 50, calories: 500 },
  { name: "Pandan Chicken", ingredients: 2, duration: 30, calories: 510 },
  { name: "Apple Pie", ingredients: 6, duration: 120, calories: 2500 },
  { name: "Pumpkin Pie", ingredients: 3, duration: 140, calories: 50 },
];

export const RecipeBox: React.FC<RecipeBoxProps> = ({
  name,
  ingredients,
  duration,
  calories,
}) => {
  return (
    <View className="flex w-full h-[100] justify-between rounded-3xl bg-[#F8F8F6]">
      <TouchableOpacity className=" min-w-full min-h-full ">
        <View className="flex flex-row justify-between items-center w-full h-full p-[15px]">
          <View className="flex flex-row justify-center items-center">
            <View
              style={{
                width: 80,
                height: 78,
                borderRadius: 15,
                backgroundColor: "#D9D9D9",
              }}
            />
            <View className="flex px-[24px] ml-[10px]">
              <Text
                numberOfLines={1}
                className=" text-base font-pps text-clip max-w-[125px]"
              >
                {name}
              </Text>
              <Text className=" text-xs font-ppr">
                {ingredients} ingredients
              </Text>
              <Text className=" text-xs font-ppr">{duration} minutes</Text>
              <Text className=" text-xs font-ppr">{calories} kcal</Text>
            </View>
          </View>
          <Image
            style={{ width: 25, height: 25 }}
            source={require("../assets/icons/ArrowRecipe.svg")}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

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
            resizeMode: "contain",
          }}
          source={require("../assets/images/Satay.png")}
        />
      </View>
      {/* List Of Recipes */}
      {/* <View className="flex items-center" style={{ width: "100%" }}> */}
      <View className="w-full flex" style={{gap: 10}}>
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
      <RecipeBox
        name={"awdawd"}
        ingredients={12}
        duration={124}
        calories={1231}
      />
      {/* </View> */}
    </View>
  );
}
