export enum ingredientsEnum {
  Vegetables = "Vegetables", //
  Fruits = "Fruits", //
  Liquids = "Liquids", //
  Grains = "Grains", //
  Meats = "Meats", //
  Dairy = "Dairy", //
  Seafood = "Seafood", //
  HerbsAndSpices = "Herbs & spices", //
  Seeds = "Seeds", //
  Oils = "Oils",
  Condiments = "Condiments", //
  NotIngredients = "Not ingredients", //
}

export enum cuisinesEnum {
  African = "African",
  Asian = "Asian",
  American = "American",
  British = "British",
  Cajun = "Cajun",
  Caribbean = "Caribbean",
  Chinese = "Chinese",
  Eastern_European = "Eastern European",
  European = "European",
  French = "French",
  German = "German",
  Greek = "Greek",
  Indian = "Indian",
  Irish = "Irish",
  Italian = "Italian",
  Japanese = "Japanese",
  Jewish = "Jewish",
  Korean = "Korean",
  Latin_American = "Latin American",
  Mediterranean = "Mediterranean",
  Mexican = "Mexican",
  Middle_Eastern = "Middle Eastern",
  Nordic = "Nordic",
  Southern = "Southern",
  Spanish = "Spanish",
  Thai = "Thai",
  Vietnamese = "Vietnamese",
}

export enum dietsEnum {
  GlutenFree = "Gluten Free",
  Ketogenic = "Ketogenic",
  Vegetarian = "Vegetarian",
  Lacto_Vegetarian = "Lacto-Vegetarian",
  Ovo_Vegetarian = "Ovo-Vegetarian",
  Vegan = "Vegan",
  Pescetarian = "Pescetarian",
  Paleo = "Paleo",
  Primal = "Primal",
  LowFODMAP = "Low FODMAP",
  Whole30 = "Whole30",
}

export interface ingredient {
  id: String;
  name: String;
  quantity: number;
  unit: String;
  expiryDate: Date;
  dateAdded: Date;
  type: ingredientsEnum;
  genericName: string;
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
  savedRecipes: string[];
}

export interface ingredientProps {
  id: String;
  name: String;
  quantity: number;
  unit: String;
  expiryDate: Date;
  dateAdded: Date;
  type: ingredientsEnum;
  genericName: string;
}
