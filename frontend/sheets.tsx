import { registerSheet } from "react-native-actions-sheet";

import ScannedItemsSheet from "./components/sheets/ScannedItemsSheet";
import RecipeIngredientSheet from "./components/sheets/RecipeIngredientSheet";
import SavedRecipesSheet from "./components/sheets/SavedRecipesSheet";
import EditIngredientSheet from "./components/sheets/EditIngredientsSheet";
import SearchRecipesSheet from "./components/sheets/SearchRecipesSheet";
import PreferenceSheet from "./components/sheets/PreferenceSheet";

registerSheet("scanned-items-sheet", ScannedItemsSheet);
registerSheet("recipe-ingredient-sheet", RecipeIngredientSheet);
registerSheet("saved-recipes-sheet", SavedRecipesSheet);
registerSheet("edit-ingredients-sheet", EditIngredientSheet);
registerSheet("search-recipes-sheet",  SearchRecipesSheet);
registerSheet("preference-sheet", PreferenceSheet);

export {};
