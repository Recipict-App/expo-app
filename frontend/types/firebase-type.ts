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

export enum subscriptionTypes {
  Regular = "Regular",
  Pro = "Pro",
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

export declare class UserMetadata {
  /**
   * The date the user was created, formatted as a UTC string.
   */
  readonly creationTime: string;
  /**
   * The date the user last signed in, formatted as a UTC string.
   */
  readonly lastSignInTime: string;
  /**
   * The time at which the user was last active (ID token refreshed),
   * formatted as a UTC Date string (eg 'Sat, 03 Feb 2001 04:05:06 GMT').
   * Returns null if the user was never active.
   */
  readonly lastRefreshTime?: string | null;
  /**
   * Returns a JSON-serializable representation of this object.
   *
   * @returns A JSON-serializable representation of this object.
   */
  toJSON(): object;
}

export interface userDataType {
  uid: string;
  name: string;
  email: string;
  metadata: UserMetadata;
  photoURL: string;
  ingredients: ingredientType[];
  cuisines: string[];
  diets: string[];
  subscription: Boolean;
}

export interface ingredientType {
  dateAdded: string;
  daysBeforeExpired: number;
  genericName: string;
  name: String;
  productCode: String;
  quantity: number;
  type: ingredientsEnum;
  unit: String;
  id: String;
}
