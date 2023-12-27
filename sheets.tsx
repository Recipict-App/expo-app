import { registerSheet } from "react-native-actions-sheet";
import ScannedItemsSheet from "./components/sheets/ScannedItemsSheet";
import RecipeIngredientSheet from "./components/sheets/RecipeIngredientSheet";
import SavedRecipesSheet from "./components/sheets/SavedRecipesSheet";

registerSheet("scanned-items-sheet", ScannedItemsSheet);
registerSheet("recipe-ingredient-sheet", RecipeIngredientSheet);
registerSheet("saved-recipes-sheet", SavedRecipesSheet);

export {};
