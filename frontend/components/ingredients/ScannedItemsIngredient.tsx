import { Text, View } from "react-native";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { ingredientProps } from "../../types/firebase-type";
import { UserContext } from "../../providers/userContext";
import { useContext } from "react";
import { Redirect } from "expo-router";

import { useDebounceCallback } from "usehooks-ts";

export const ScannedItemsIngredient: React.FC<ingredientProps> = ({
  name,
  quantity,
  unit,
  expiryDate,
  dateAdded,
  type,
  id,
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

  const showDate = dateAdded?.toString().slice(0, 10) || "Undefined";

  return (
    <TouchableOpacity
      className="w-full"
      onPress={debouncedhandleShowIngredient}
    >
      <View className="w-full h-[72px] rounded-3xl bg-[#F8F8F6] flex-row pl-[20px] items-center justify-between">
        <View className="flex flex-row">
          {/* Image placeholder */}
          <View className="bg-[#9B9B9B] rounded-lg h-8 w-8 justify-center flex " />

          {/* Text */}
          <View className="ml-4">
            <Text numberOfLines={1} className="text-sm font-pps max-w-[220px]">
              {name}
            </Text>
            <Text
              numberOfLines={1}
              className="text-xs font-ppr text-grey max-w-[220px]"
            >
              {quantity + " " + unit + " - " + showDate}
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
