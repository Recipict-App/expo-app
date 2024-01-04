export enum ingredientTypes {
  "Vegetables",
  "Fruits",
  "Liquids",
  "Grains",
  "Meats",
  "Dairy",
  "Seafood",
  "Herbs & spices",
  "Seeds",
  "Oils",
  "Condiments",
  "Not Ingredients",
}

export interface ingredient {
  name: String;
  quantity: number;
  unit: String;
  expiryDate: Date;
  dateAdded: Date;
  type: ingredientTypes;
}

export enum subscriptionTypes {
  "Regular",
  "Pro",
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
