import { createContext, Dispatch } from "react";
import { ingredientProps } from "./firebase-type";

interface ScannedIngredientsContextType {
  scannedIngredients: any;
  //    ingredientProps[] | undefined;
  setScannedIngredients: Dispatch<React.SetStateAction<any>>;
}

export const ScannedIngredientsContext =
  createContext<ScannedIngredientsContextType>({
    scannedIngredients: [],
    setScannedIngredients: () => {},
  });
