import { ImageBackground, TouchableOpacity, View, Text } from "react-native";
import { useDebounceCallback } from "usehooks-ts";

import { SheetManager } from "react-native-actions-sheet";
import { recipeType } from "../../types/recipe-type";

export default function RecipeBoxBig({ recipe }: { recipe: recipeType }) {
  const handleShowRecipe = () => {
    SheetManager.show("recipe-ingredient-sheet", {
      payload: {
        recipe: recipe,
      },
    });
  };

  const debouncedOnClick = useDebounceCallback(handleShowRecipe, 500, {
    leading: true,
    trailing: false,
  });

  return (
    <TouchableOpacity onPress={debouncedOnClick}>
      <View
        className=" rounded-2xl m-[5] flex justify-end items-center overflow-hidden"
        style={{ width: 127, height: 210 }}
      >
        <ImageBackground
          style={{ width: "110%", height: "110%" }}
          source={{
            uri: recipe.image,
          }}
        >
          <View
            className="w-full h-full justify-end items-center"
            style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
          >
            <Text className="text-white font-pps w-3/5 flex text-center pb-4">
              {recipe.title}
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}