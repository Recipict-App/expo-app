export interface recipeType {
  id: number;
  title: string;
  servings: number;
  Cleanedsummary: string;
  instructions: {
    equipment: Equipment[];
    ingredients: Ingredient[];
    step: string;
  }[];
  missedIngredientCount: number;
  readyInMinutes: number;
  totalIngredients: {
    name: string;
    amount: number;
    unit: string;
    original: string;
  }[];
  image: string;
  calories: string | null;
  requiredEquipment: string[];
}

/* Spoonacular type for Recommended recipe function */

export interface SpoonacularFetchRecommendedRecipes {
  results: RecipeProps[];
  offset: number;
  number: number;
  totalResults: number;
}

export interface RecipeProps {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  lowFodmap: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  preparationMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  healthScore: number;
  creditsText: string;
  sourceName: string;
  pricePerServing: number;
  extendedIngredients: ExtendedIngredient[];
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  image: string;
  imageType: string;
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  occasions: string[];
  analyzedInstructions: AnalyzedInstruction[];
  spoonacularScore: number;
  spoonacularSourceUrl: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
  likes: number;
  missedIngredients: MissedIngredient[];
  usedIngredients: UsedIngredient[];
  unusedIngredients: UnusedIngredient[];
}

export interface ExtendedIngredient {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: string[];
  measures: Measures;
}

export interface Measures {
  us: Us;
  metric: Metric;
}

export interface Us {
  amount: number;
  unitShort: string;
  unitLong: string;
}

export interface Metric {
  amount: number;
  unitShort: string;
  unitLong: string;
}

export interface AnalyzedInstruction {
  name: string;
  steps: Step[];
}

export interface Step {
  number: number;
  step: string;
  ingredients: Ingredient[];
  equipment: Equipment[];
  length?: Length;
}

export interface Ingredient {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

export interface Equipment {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

export interface Length {
  number: number;
  unit: string;
}

export interface MissedIngredient {
  id: number;
  amount: number;
  unit: string;
  unitLong: string;
  unitShort: string;
  aisle: string;
  name: string;
  original: string;
  originalName: string;
  meta: string[];
  image: string;
  extendedName?: string;
}

export interface UsedIngredient {
  id: number;
  amount: number;
  unit: string;
  unitLong: string;
  unitShort: string;
  aisle: string;
  name: string;
  original: string;
  originalName: string;
  meta: string[];
  image: string;
}

export interface UnusedIngredient {
  id: number;
  amount: number;
  unit: string;
  unitLong: string;
  unitShort: string;
  aisle: string;
  name: string;
  original: string;
  originalName: string;
  meta: any[];
  image: string;
}

export interface JSON_FORMAT {
  date: string;
  ingredients: [
    {
      name: String;
      quantity: number;
      unit:
        | "teaspoon"
        | "tablespoon"
        | "cup"
        | "milliliters"
        | "liters"
        | "grams"
        | "kilograms"
        | "ounces"
        | "pounds"
        | "pieces";
      daysBeforeExpired: number;
      dateAdded: string | "";
      type:
        | "Vegetables"
        | "Fruits"
        | "Liquids"
        | "Grains"
        | "Meats"
        | "Dairy"
        | "Seafood"
        | "Herbs & spices"
        | "Seeds"
        | "Oils"
        | "Condiments"
        | "Not ingredients";
      genericName: string;
      productCode: string;
    }
  ];
}

15930 - 14093