import { Text, View } from "react-native";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { ingredientProps, ingredientsEnum } from "../../firebase-type";
import { UserContext } from "../../userContext";
import { useContext } from "react";
import { Redirect } from "expo-router";

import { useDebounceCallback } from "usehooks-ts";

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

export const Ingredient: React.FC<ingredientProps & { mode: string }> = ({
  name,
  quantity,
  unit,
  expiryDate,
  dateAdded,
  type,
  id,
  mode,
}) => {
  const { userData, setUserData } = useContext(UserContext);
  if (!userData) return <Redirect href="/" />;
  const data = userData[0];
  const userGoogleToken = data.googleToken;

  const handleShowIngredient = async () => {
    await SheetManager.show("edit-ingredients-sheet", {
      payload: {
        userGoogleToken: userGoogleToken,
        ingredient: {
          name: name,
          quantity: quantity,
          unit: unit,
          expiryDate: expiryDate,
          dateAdded: dateAdded,
          type: type,
          id: id,
        },
        mode: mode,
      },
    });
  };

  const debouncedhandleShowIngredient = useDebounceCallback(
    handleShowIngredient,
    500,
    {
      leading: true,
      trailing: false,
    }
  );

  const dayDifference =
    1 +
    Math.max(
      Math.floor(
        (new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      ),
      0
    );

  return (
    <TouchableOpacity
      className="w-full"
      onPress={debouncedhandleShowIngredient}
    >
      <View className="w-full h-[72px] rounded-3xl bg-[#F8F8F6] flex-row pl-[20px] items-center justify-between">
        <View className="flex flex-row">
          {/* Image placeholder */}
          <View className="rounded-lg h-8 w-8 justify-center items-center flex ">
            <Image
              className="object-contain h-7 w-7"
              source={ingredientImages[type as keyof typeof ingredientImages]}
            />
          </View>

          {/* Text */}
          <View className="ml-4">
            <Text numberOfLines={1} className="text-sm font-pps max-w-[220px]">
              {name}
            </Text>
            <Text
              numberOfLines={1}
              className="text-xs font-ppr text-grey max-w-[220px]"
            >
              {quantity +
                " " +
                unit +
                "   |   " +
                dayDifference +
                " days before expired"}
            </Text>
          </View>
        </View>

        {/* Arrow */}
        <Image
          className="flex w-[6px] h-[10px] object-contain mr-7"
          source={require("../../assets/icons/Arrow.svg")}
        />
      </View>
    </TouchableOpacity>
  );
};
