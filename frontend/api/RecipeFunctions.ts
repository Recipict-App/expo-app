import {
  RecipeProps,
  SpoonacularFetchRecommendedRecipes,
  Step,
  ExtendedIngredient,
  recipeType,
} from "../types/recipe-type";
/* Migrating to react query */

function stripHtmlTags(htmlString: string): string {
  return htmlString.replace(/<[^>]*>/g, "");
}

function extractCalories(inputString: string): string | null {
  const regex = /(\d+)\s*calories\b/i;
  const match = inputString.match(regex);

  return match && match[1] ? match[1] : null;
}

export async function fetchRecommendedRecipes(requestBody: any): Promise<{
  newRecipes: recipeType[];
  newReadyRecipes: recipeType[];
  newMissingRecipes: recipeType[];
}> {
  console.log("REACT QUERY - Fetching recommended recipes");
  // console.log(requestBody);

  let newRecipes: recipeType[] = [];
  let newReadyRecipes: recipeType[] = [];
  let newMissingRecipes: recipeType[] = [];

  const spoonacular_recipe_by_ingredient_url = process.env.EXPO_CF_SPOONACULAR_API_RECIPE_BY_INGREDIENT || "";
  if (!spoonacular_recipe_by_ingredient_url) throw new Error("spoonacular_recipe_by_ingredient_url not found");

  const apiResponse = await fetch(
    spoonacular_recipe_by_ingredient_url,
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
  );

  const response: SpoonacularFetchRecommendedRecipes = await apiResponse.json();


  response.results.map((recipeInfo: RecipeProps) => {
    const {
      id,
      title,
      summary,
      analyzedInstructions,
      missedIngredientCount,
      readyInMinutes,
      extendedIngredients,
      image,
      servings,
    } = recipeInfo;

    const requiredEquipment: string[] = [];

    const instructions = analyzedInstructions[0].steps.map((stepInfo: Step) => {
      for (let i = 0; i < stepInfo.equipment.length; i++) {
        if (!requiredEquipment.includes(stepInfo.equipment[i].name)) {
          requiredEquipment.push(stepInfo.equipment[i].name);
        }
      }
      return {
        equipment: stepInfo.equipment,
        ingredients: stepInfo.ingredients,
        step: stepInfo.step,
      };
    });

    const totalIngredients = extendedIngredients.map(
      (ingredient: ExtendedIngredient) => {
        return {
          name: ingredient.name,
          amount: ingredient.amount,
          unit: ingredient.unit == "" ? "pc" : ingredient.unit,
          original: ingredient.originalName,
        };
      }
    );

    const calories = extractCalories(summary);
    const Cleanedsummary = stripHtmlTags(summary);

    const recipe: recipeType = {
      id,
      title,
      Cleanedsummary,
      instructions,
      missedIngredientCount,
      readyInMinutes,
      totalIngredients,
      image,
      calories,
      requiredEquipment,
      servings,
    };

    newRecipes.push(recipe);

    if (missedIngredientCount == 0) {
      newReadyRecipes.push(recipe);
    } else {
      newMissingRecipes.push(recipe);
    }
  });

  return { newRecipes, newReadyRecipes, newMissingRecipes };
}

export async function fetchRandomRecipes(requestBody: any) {
  console.log("REACT QUERY - Fetching random recipes");
  // console.log(requestBody);

  let newRecipes: any[] = [];

  const spoonacular_random_recipe_url = process.env.EXPO_CF_SPOONACULAR_API_RANDOM_RECIPE || "";
  if (!spoonacular_random_recipe_url) throw new Error("spoonacular_random_recipe_url not found");


  const apiResponse = await fetch(
    spoonacular_random_recipe_url,
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
  );

  const response = await apiResponse.json();
  // console.log(response);
  response.recipes.map((recipeInfo: any) => {
    const {
      title,
      summary,
      analyzedInstructions,
      missedIngredientCount,
      id,
      readyInMinutes,
      extendedIngredients,
      image,
    } = recipeInfo;
    const requiredEquipment: string[] = [];
    const instructions = analyzedInstructions[0].steps.map((stepInfo: any) => {
      for (let i = 0; i < stepInfo.equipment.length; i++) {
        if (!requiredEquipment.includes(stepInfo.equipment[i].name)) {
          requiredEquipment.push(stepInfo.equipment[i].name);
        }
      }
      return {
        equipment: stepInfo.equipment,
        ingredients: stepInfo.ingredients,
        step: stepInfo.step,
      };
    });

    const totalIngredients = extendedIngredients.map((ingredient: any) => {
      return {
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit == "" ? "ea" : ingredient.unit,
      };
    });
    const calories = extractCalories(summary);
    const Cleanedsummary = stripHtmlTags(summary);

    newRecipes.push({
      title,
      instructions,
      missedIngredientCount,
      id,
      readyInMinutes,
      totalIngredients,
      image,
      calories,
      requiredEquipment,
      Cleanedsummary,
    });
  });

  return { newRecipes };
}

// todo fix search

export async function searchRecipes(requestBody: any) {
  console.log("searching recipes...");

  let newRecipes: any[] = [];

  const spoonacular_search_recipe_url = process.env.EXPO_CF_SPOONACULAR_API_SEARCH_RECIPE || "";
  if (!spoonacular_search_recipe_url) throw new Error("spoonacular_search_recipe_url not found");


  const apiResponse = await fetch(
    spoonacular_search_recipe_url,
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
  );

  const response = await apiResponse.json();
  response.results.map((recipeInfo: any) => {
    const {
      title,
      summary,
      analyzedInstructions,
      missedIngredientCount,
      id,
      readyInMinutes,
      extendedIngredients,
      image,
    } = recipeInfo;
    const requiredEquipment: string[] = [];
    const instructions = analyzedInstructions[0].steps.map((stepInfo: any) => {
      for (let i = 0; i < stepInfo.equipment.length; i++) {
        if (!requiredEquipment.includes(stepInfo.equipment[i].name)) {
          requiredEquipment.push(stepInfo.equipment[i].name);
        }
      }
      return {
        equipment: stepInfo.equipment,
        ingredients: stepInfo.ingredients,
        step: stepInfo.step,
      };
    });

    const totalIngredients = extendedIngredients.map((ingredient: any) => {
      return {
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit == "" ? "ea" : ingredient.unit,
      };
    });
    const calories = extractCalories(summary);
    const Cleanedsummary = stripHtmlTags(summary);

    newRecipes.push({
      title,
      instructions,
      missedIngredientCount,
      id,
      readyInMinutes,
      totalIngredients,
      image,
      calories,
      requiredEquipment,
      Cleanedsummary,
    });
  });
  // console.log(newRecipes);
  return { newRecipes };
}