import { View, Text } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { RecipeBox } from "./RecipeBox";

import { useFetchRandomRecipes } from "../../api/queries";
import RecipeBoxSkeleton from "../skeletons/RecipeBoxSkeleton";
import { userDataType } from "../../types/firebase-type";


export default function Explore({ userData }: { userData: userDataType | undefined }) {
  if (!userData) return null;
  // console.log("User Data from context EXPLOREE:", userData);

  const ingredientsString =
    userData.ingredients.length > 0
      ? userData.ingredients
          .map((ingredient) => ingredient.genericName)
          .join(",")
      : "";
  const cuisinesString = userData.cuisines.join(",");
  const dietsString = userData.diets.join(",");

  const requestBody = {
    subscription: userData.subscription,
    cuisines: "", //  todo: error when passing cuisies and diets
    diets: "", //  todo: error when passing cuisies and diets
  };

  const { isPending, error, data, refetch } =
    useFetchRandomRecipes(requestBody);

  return (
    <View className="flex items-center mt-1 w-full">
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
          source={require("../../assets/images/Satay.png")}
        />
      </View>
      <View className="w-full flex" style={{ gap: 10 }}>
        {isPending && (
          <>
            <RecipeBoxSkeleton />
            <RecipeBoxSkeleton />
            <RecipeBoxSkeleton />
          </>
        )}

        {data?.newRecipes.map((item: any, index: any) => {
          return <RecipeBox key={item.id} recipe={item} />;
        })}
      </View>
    </View>
  );
}