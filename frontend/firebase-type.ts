export enum ingredientTypes {
  Vegetables = "Vegetables",
  Fruits = "Fruits",
  Liquids = "Liquids",
  Grains = "Grains",
  Meats = "Meats",
  Dairy = "Dairy",
  Seafood = "Seafood",
  HerbsAndSpices = "Herbs & spices",
  Seeds = "Seeds",
  Oils = "Oils",
  Condiments = "Condiments",
  NotIngredients = "Not ingredients",
}

export interface ingredient {
  id: String;
  name: String;
  quantity: number;
  unit: String;
  expiryDate: Date;
  dateAdded: Date;
  type: ingredientTypes;
}

export enum subscriptionTypes {
  Regular = "Regular",
  Pro = "Pro",
}

export interface preferences {
  diet: String[];
  cuisine: String[];
}

export interface userInfoType {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

export interface userDataProps {
  name: String;
  email: String;
  googleToken: String;
  ingredients: ingredient[];
  preferences: preferences;
  subscription: String;
}

export interface ingredientProps {
  id: String;
  name: String;
  quantity: number;
  unit: String;
  expiryDate: Date;
  dateAdded: Date;
  type: ingredientTypes;
}

interface recipeInfo {
  title: String;
  summary: String;
  instructions: any[];
  missedIngredientCount: number;
  id: String;
  readyInMinutes: number;
  totalIngredients: {
    name: String;
    quantity: String;
  };
}
