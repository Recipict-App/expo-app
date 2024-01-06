import { Text, View } from "react-native";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { ingredientProps } from "../firebase-type";
import { useContext } from "react";
import { UserContext } from "../userContext";
import { Redirect } from "expo-router";
const debounce = (cb: any, delay = 1000) => {
  let timeout: any;

  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
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

export const Ingredient: React.FC<ingredientProps> = ({
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
  const token = data.googleToken;

  const handleShowIngredient = async () => {
    console.log(token);
    console.log(typeof(token));
    const newIngredient = await SheetManager.show("edit-ingredients-sheet", {
      payload: {
        name: name,
        quantity: quantity,
        unit: unit,
        expiryDate: expiryDate,
        dateAdded: dateAdded,
        type: type,
        id: id,
      },
    });

    const response = await fetch(
      "https://us-central1-recipict-gcp.cloudfunctions.net/function-edit-ingredients",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token, ingredient: newIngredient }),
      }
    );

    const result = await response.json();

    console.log(response.status);
    console.log(result);


  };
  const showDate = dateAdded.toString().slice(0, 10);
  return (
    <TouchableOpacity
      className="w-full"
      onPress={throttle(handleShowIngredient)}
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
          source={require("../assets/icons/Arrow.svg")}
        />
      </View>
    </TouchableOpacity>
  );
};
