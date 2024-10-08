import { Text, View } from "react-native";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native";
import { SheetManager } from "react-native-actions-sheet";

import { useContext } from "react";
import { Redirect } from "expo-router";

import { useDebounceCallback } from "usehooks-ts";
import { ingredientType, ingredientsEnum } from "../../types/firebase-type";
import { UserContext } from "../../providers/userContext";

const FRUIT_IMG = require("../../assets/icons/ingredients/Fruits.svg");
const LIQUID_IMG = require("../../assets/icons/ingredients/Liquids.svg");
const GRAIN_IMG = require("../../assets/icons/ingredients/Grains.svg");
const MEAT_IMG = require("../../assets/icons/ingredients/Meats.svg");
const DAIRY_IMG = require("../../assets/icons/ingredients/Dairy.svg");
const SEAFOOD_IMG = require("../../assets/icons/ingredients/Seafood.svg");
const HERB_IMG = require("../../assets/icons/ingredients/Herbs&Spices.svg");
const SEED_IMG = require("../../assets/icons/ingredients/Seeds.svg");
const OIL_IMG = require("../../assets/icons/ingredients/Oils.svg");
const CONDIMENT_IMG = require("../../assets/icons/ingredients/Condiments.svg");
const NOT_INGREDIENT_IMG = require("../../assets/icons/ingredients/NotIngredients.svg");

const ingredientImages = {
  [ingredientsEnum.Fruits]: FRUIT_IMG,
  [ingredientsEnum.Liquids]: LIQUID_IMG,
  [ingredientsEnum.Grains]: GRAIN_IMG,
  [ingredientsEnum.Meats]: MEAT_IMG,
  [ingredientsEnum.Dairy]: DAIRY_IMG,
  [ingredientsEnum.Seafood]: SEAFOOD_IMG,
  [ingredientsEnum.HerbsAndSpices]: HERB_IMG,
  [ingredientsEnum.Seeds]: SEED_IMG,
  [ingredientsEnum.Oils]: OIL_IMG,
  [ingredientsEnum.Condiments]: CONDIMENT_IMG,
  [ingredientsEnum.NotIngredients]: NOT_INGREDIENT_IMG,
};

export const Ingredient: React.FC<ingredientType & { mode: string }> = ({ name, quantity, unit, daysBeforeExpired, productCode, genericName, dateAdded, type, id, mode }) => {
  const { userData, setUserData } = useContext(UserContext);
  if (!userData) return <Redirect href="/" />;

  const handleShowIngredient = async () => {
    console.log("from ingredient: ", daysBeforeExpired);
    await SheetManager.show("edit-ingredients-sheet", {
      payload: {
        ingredient: {
          name: name,
          quantity: quantity,
          unit: unit,
          daysBeforeExpired: daysBeforeExpired,
          productCode: productCode,
          genericName: genericName,
          dateAdded: dateAdded,
          type: type,
          id: id,
        },
        mode: mode,
      },
    });
  };

  let imageSource;
  try {
    imageSource = ingredientImages[type as keyof typeof ingredientImages];
    if (!imageSource) {
      throw new Error("Image not found");
    }
  } catch (error) {
    imageSource = NOT_INGREDIENT_IMG;
  }

  const debouncedhandleShowIngredient = useDebounceCallback(handleShowIngredient, 500, {
    leading: true,
    trailing: false,
  });

  return (
    <TouchableOpacity className="w-full" onPress={debouncedhandleShowIngredient}>
      <View className={`w-full h-[72px] rounded-3xl  ${daysBeforeExpired === 0 ? "bg-[#ffecec]" : "bg-[#F8F8F6]"} flex-row pl-[20px] items-center justify-between`}>
        <View className="flex flex-row">
          {/* Image placeholder */}
          <View className="rounded-lg h-8 w-8 justify-center items-center flex ">
            <Image className="object-contain h-7 w-7" source={imageSource} />
          </View>

          {/* Text */}
          <View className="ml-4">
            <Text numberOfLines={1} className="text-sm font-pps max-w-[200px]" adjustsFontSizeToFit>
              {name}
            </Text>
            <View className="flex-row">
              <Text numberOfLines={1} className="text-xs font-ppr max-w-[200px] text-grey" adjustsFontSizeToFit>
                {quantity + " " + unit + "  |  "}
              </Text>
              <Text className={`text-xs font-ppr ${daysBeforeExpired === 0 ? "text-[#FE0303]" : "text-grey"}`} adjustsFontSizeToFit>
                {daysBeforeExpired + " days before expired"}
              </Text>
            </View>
          </View>
        </View>

        {/* Arrow */}
        <Image className="flex w-[6px] h-[10px] object-contain mr-7" source={require("../../assets/icons/Arrow.svg")} />
      </View>
    </TouchableOpacity>
  );
};
