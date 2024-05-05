import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { SheetManager } from "react-native-actions-sheet";
import { Redirect } from "expo-router";

import { Shelf } from "../components/ingredients/Shelf";
import { ingredientProps } from "../firebase-type";

import { useContext, useState } from "react";
import { UserContext } from "../userContext";

// Group items by type for display
function groupByType(objectArray: ingredientProps[]) {
  return objectArray.reduce(function (acc: any, obj: ingredientProps) {
    var key = obj["type"];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

export default function pantry() {
  const [searchInput, setSearchInput] = useState<string>("");

  // get user data from local
  const { userData, setUserData } = useContext(UserContext);
  if (!userData) return <Redirect href="/" />;

  // process the data
  const data = userData;
  const ingredients = data.ingredients;
  const filteredIngredients = ingredients.filter((ingredient) => {
    return ingredient?.name?.toLowerCase().includes(searchInput.toLowerCase());
  });
  const groupedItems = groupByType(filteredIngredients);
  const userGoogleToken = data.uid;
  // Button handlers
  const handleShowIngredient = async () => {
    await SheetManager.show("edit-ingredients-sheet");
  };

  return (
    <View className="bg-white ">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Screen */}
        <View className="min-h-screen py-[32px]">
          <View className="px-[24px] pt-[32px] overflow-visible">
            <Text className="font-pps text-3xl">Pantry</Text>
          </View>

          <View
            className="w-full items-center justify-center"
            style={{ display: "flex" }}
          >
            {/* Search bar */}
            <View className="flex flex-row w-11/12 rounded-2xl h-[48px] bg-[#F8F8F6] mt-2 items-center">
              <Image
                className="flex w-[20px] h-[20px] object-contain justify-center ml-5"
                source={require("../assets/icons/Search.svg")}
              />
              <TextInput
                className="flex ml-4 font-ppr text-sm w-full justify-center "
                placeholder="Search"
                onChangeText={setSearchInput}
                value={searchInput}
              />
            </View>

            <View className="w-11/12 justify-center items-center ">
              {/* Shelf */}
              {ingredients[0] ? (
                /* Dispay items */
                Object.keys(groupedItems).map((key, index) => {
                  return (
                    <Shelf
                      key={index}
                      category={key}
                      ingredients={groupedItems[key]}
                    />
                  );
                })
              ) : (
                <View className="w-full py-[30%] h-[300px] flex items-center justify-center">
                  <View className=" h-fit flex justify-center items-center border rounded-3xl p-4">
                    <Text>Sadly, you have no nothing</Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Add ingredient button */}
      <View className="w-[70px] h-[70px fixed bottom-[80px] left-[75%]">
        <TouchableOpacity onPress={handleShowIngredient}>
          <Image
            className="w-[70px] h-[70px] object-contain opacity-100  "
            source={require("../assets/icons/AddIngredient.svg")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
