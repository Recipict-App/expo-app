import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Button,
  Alert,
  ImageBackground,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SheetManager } from "react-native-actions-sheet";
import { Image } from "expo-image";
import recipe from "../../app/RecipeScreen";
import PagerView from "react-native-pager-view";

const dummyIngredients = [
  "Garlic",
  "Chili",
  "Rice",
  "Dany",
  "Other spices idk what but a long one",
  "Recipict",
  "Purply",
  "Orangy",
  "Bowly",
  "Satay",
];

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

const handleCloseRecipe = () => {
  SheetManager.hide("recipe-ingredient-sheet");
};
export default function RecipeIngredientSheet(
  props: SheetProps<{
    recipe: {
      name: String;
      imageURI: string;
      ingredients: any;
      readyInMinutes: any;
    };
  }>
) {
  console.log(props.payload?.recipe.ingredients);
  return (
    <ActionSheet id={props.sheetId}>
      <View className=" max-h-[80%] h-fit flex items-center gap-4 px-5 py-2 ">
        <View
          key="0"
          className="w-full h-[20] flex justify-center items-center"
        >
          <View
            style={{
              width: "50%",
              height: 4,
              borderRadius: 10,
              backgroundColor: "#9F9F9F",
            }}
          >
            <TouchableOpacity
              className=" min-h-full min-w-full"
              onPress={throttle(handleCloseRecipe)}
            />
          </View>
        </View>
        <View className="w-full h-[40px] justify-center items-center flex">
          <Text className="font-pps text-2xl text-center" adjustsFontSizeToFit>
            {props.payload?.recipe.name}
          </Text>
        </View>
        {/* Image */}
        <View className=" w-4/5 h-1/3 rounded-2xl overflow-hidden bg-green">
          <Image
            className="w-[101%] h-[110%]"
            source={{ uri: props.payload?.recipe.imageURI }}
            contentFit="contain"
          />
        </View>
        {/* Summary */}
        <View className="w-full flex flex-row ">
          {/* Ingredients */}
          <View className=" flex h-[275px] w-[200px] items-center p-3">
            <Text className="font-pps text-lg">Ingredients:</Text>
            <FlatList
              data={props.payload?.recipe.ingredients}
              renderItem={({ item }) => (
                <View className="flex w-4/5 flex-row mx-2">
                  <Text className="font-ppr text-base">- </Text>
                  <Text className="font-ppr text-base">
                    {item.amount} {item.unit} {item.name}
                  </Text>
                </View>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
          {/* General Information */}
          <View className=" flex h-full w-[200px] space-y-2 p-3">
            <Text className="font-pps text-base">Duration:</Text>
            <Text className="font-ppr text-base">
              {props.payload?.recipe.readyInMinutes} minutes
            </Text>
            <Text className="font-pps text-base">Calories: </Text>
            <Text className="font-ppr text-base">20 kcal</Text>
            <Text className="font-pps text-base">Equipment(s): </Text>
            <Text className="font-ppr text-base">Pan, Wok</Text>
          </View>
        </View>
        <View
          className="flex h-[40] w-full flex-row justify-center items-center"
          style={{ gap: 20 }}
        >
          {/* close button */}
          <View
            className="flex w-[10%] h-full justify-center items-center rounded-xl"
            style={{ backgroundColor: "#FFCCC5" }}
          >
            <TouchableOpacity
              className="min-w-full min-h-full justify-center flex items-center"
              onPress={handleCloseRecipe}
            >
              <Image
                style={{
                  width: 20,
                  height: 20,
                  position: "absolute",
                }}
                source={require("../../assets/icons/Exit.svg")}
              />
            </TouchableOpacity>
          </View>
          {/* see instruction button */}
          <View className="flex w-[70%] h-full justify-center items-center bg-green rounded-2xl">
            <TouchableOpacity
              className="flex min-w-full min-h-full justify-center items-center rounded-2xl"
              style={{ width: 100 }}
              onPress={() => {
                console.log("pressed!");
              }}
            >
              <Text className="font-pps text-white text-lg">
                See Instructions
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ActionSheet>
  );
}
