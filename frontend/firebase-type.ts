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

export enum subscriptionTypes {
  Regular = "Regular",
  Pro = "Pro",
}

export interface ingredient {
  name: String;
  quantity: number;
  unit: String;
  expiryDate: Date;
  dateAdded: Date;
  type: ingredientTypes;
}

export interface preferences {
  diet: String[];
  cuisine: String[];
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
  name: String;
  quantity: number;
  unit: String;
  expiryDate: Date;
  dateAdded: Date;
  type: ingredientTypes;
}
