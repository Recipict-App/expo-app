import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { RecipeBoxProps, RecipeBox } from "../RecipeBox";
import { SheetManager } from "react-native-actions-sheet";

const dummyRecipePreview: RecipeBoxProps[] = [
  { name: "Butter Chicken", ingredients: 5, duration: 50, calories: 500 },
  { name: "Pandan Chicken", ingredients: 2, duration: 30, calories: 510 },
  { name: "Apple Pie", ingredients: 6, duration: 120, calories: 2500 },
  { name: "Pumpkin Pie", ingredients: 3, duration: 140, calories: 50 },
  { name: "Pumpkin Pie", ingredients: 3, duration: 140, calories: 50 },
  { name: "Pumpkin Pie", ingredients: 3, duration: 140, calories: 50 },
  { name: "Pie", ingredients: 3, duration: 140, calories: 50 },
];

const handleCloseSavedRecipe = () => {
  SheetManager.hide("saved-recipes-sheet");
};

export default function SavedRecipesSheet(props: SheetProps) {
  return (
    <ActionSheet id={props.sheetId} containerStyle={{ height: "80%" }}>
      <View
        className="w-full h-fit flex items-center px-5 py-2 pb-[100]"
        style={{ gap: 3 }}
      >
        <View className="w-full h-[20] flex justify-center items-center">
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
              onPress={handleCloseSavedRecipe}
            />
          </View>
        </View>
        <View className="flex flex-row m-5 w-full justify-center items-center">
          <Text className=" font-ppr text-2xl">Saved Recipes</Text>
        </View>
        <ScrollView className="w-full" showsVerticalScrollIndicator={false}>
          <View className="w-full" style={{ gap: 10 }}>
            {dummyRecipePreview.map((item, index) => {
              return (
                <RecipeBox
                  key={index}
                  name={item.name}
                  duration={item.duration}
                  ingredients={item.ingredients}
                  calories={item.calories}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    </ActionSheet>
  );
}
