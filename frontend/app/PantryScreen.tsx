import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { SheetManager } from "react-native-actions-sheet";

import { IngredientProps, Ingredient } from "../components/Ingredient";
import { ShelfProps, Shelf } from "../components/Shelf";

const dummyIngredients: IngredientProps[] = [
  { name: "Sweet Soy Sauce", quantity: "500ml", duration: "3 months ago" },
  { name: "Dany Raihan", quantity: "500kg", duration: "19 years ago" },
  { name: "Erick Jovan", quantity: "56kg", duration: "99 years ago" },
  { name: "Dany Raihan", quantity: "500kg", duration: "19 years ago" },
  { name: "Dany Raihan", quantity: "500kg", duration: "19 years ago" },
];



export default function pantry() {

  const handleShowIngredient = () => {
    SheetManager.show('edit-ingredients-sheet');
  }

  return (
    <SafeAreaView className="bg-white ">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Screen */}
        <View className="min-h-screen">
          <View className="px-[24px] pt-[32px] overflow-visibe">
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
              />
            </View>

            <View className="w-11/12 justify-center items-center">
              {/* Shelf */}
              <Shelf category="Meats" ingredients={dummyIngredients} />
              <Shelf category="Vegetables" ingredients={dummyIngredients} />
              <Shelf category="Spices" ingredients={dummyIngredients} />
              <Shelf category="Beverages" ingredients={dummyIngredients} />
              <Shelf category="Sauces" ingredients={dummyIngredients} />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Add ingredient button */}
      <TouchableOpacity onPress={handleShowIngredient}>
        <Image
          className="w-[70px] h-[70px] object-contain fixed bottom-[80px] left-[300px] opacity-100 "
          source={require("../assets/icons/AddIngredient.svg")}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
