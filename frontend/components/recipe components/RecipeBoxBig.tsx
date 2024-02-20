import { ImageBackground, TouchableOpacity, View, Text } from "react-native";
import { useDebounceCallback } from "usehooks-ts";

import { SheetManager } from "react-native-actions-sheet";

interface RecipeBoxBigProps {
  name: string;
  imageURI: string;
  ingredients: any;
  equipment: string[];
  calories: string;
}

const handleShowRecipe = (
  name: String,
  imageURI: string,
  ingredients: any,
  equipment: string[],
  calories: string
) => {
  SheetManager.show("recipe-ingredient-sheet", {
    payload: {
      recipe: {
        name: name,
        imageURI: imageURI,
        ingredients: ingredients,
        equipment: equipment,
        calories: calories,
      },
    },
  });
};

export default function RecipeBoxBig({
  name,
  imageURI,
  ingredients,
  equipment,
  calories,
}: RecipeBoxBigProps) {
  console.log("ingredients: " + ingredients);
  const debouncedOnClick = useDebounceCallback(handleShowRecipe, 500, {
    leading: true,
    trailing: false,
  });

  return (
    <TouchableOpacity
      onPress={() =>
        debouncedOnClick(name, imageURI, ingredients, equipment, calories)
      }
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
}
