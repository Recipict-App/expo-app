import { registerSheet } from "react-native-actions-sheet";
import ScannedItemsSheet from "./components/sheets/ScannedItemsSheet";
import RecipeIngredientSheet from "./components/sheets/RecipeIndgredientSheet";

registerSheet("scanned-items-sheet", ScannedItemsSheet);
registerSheet("recipe-ingredient-sheet", RecipeIngredientSheet);

export {};
