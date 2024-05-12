import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import { View, Text, ScrollView } from "react-native";
import { RecipeBox } from "../recipes/RecipeBox";
import { SheetManager } from "react-native-actions-sheet";
import { recipeType } from "../../types/recipe-type";

const handleCloseSearchRecipe = () => {
  SheetManager.hide("search-recipes-sheet");
};

export default function SearchRecipesSheet(
  props: SheetProps<{ recipes: recipeType[] }>
) {
  const recipes = props.payload?.recipes;
  return (
    <ActionSheet id={props.sheetId} containerStyle={{ height: "80%" }}>
      <View
        className="w-full h-fit flex items-center px-5 py-2 pb-[100]"
        style={{ gap: 3 }}
      >
        <View className="flex flex-row m-5 w-full justify-center items-center">
          <Text className=" font-ppr text-2xl">Search Recipes</Text>
        </View>
        <ScrollView className="w-full" showsVerticalScrollIndicator={false}>
          <View className="w-full" style={{ gap: 10 }}>
            {recipes && recipes.length > 0 ? (
              recipes.map((item: recipeType, index: any) => {
                return <RecipeBox key={index} recipe={item} />;
              })
            ) : (
              <Text>Sorry No Recipes Found</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </ActionSheet>
  );
}