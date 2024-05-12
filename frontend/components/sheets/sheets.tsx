import { registerSheet } from "react-native-actions-sheet";

import ScannedItemsSheet from "./ScannedItemsSheet";
import RecipeIngredientSheet from "./RecipeIngredientSheet";
import SavedRecipesSheet from "./SavedRecipesSheet";
import EditIngredientSheet from "./EditIngredientsSheet";
import SearchRecipesSheet from "./SearchRecipesSheet";
import PreferenceSheet from "./PreferenceSheet";

registerSheet("scanned-items-sheet", ScannedItemsSheet);
registerSheet("recipe-ingredient-sheet", RecipeIngredientSheet);
registerSheet("saved-recipes-sheet", SavedRecipesSheet);
registerSheet("edit-ingredients-sheet", EditIngredientSheet);
registerSheet("search-recipes-sheet", SearchRecipesSheet);
registerSheet("preference-sheet", PreferenceSheet);

export {};
