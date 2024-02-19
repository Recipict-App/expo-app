
/* Migrating to react query */

export async function fetchRecommendedRecipes(requestBody: any) {
  console.log("Fetching recommended recipes with REACT QUERY...");

  let newRecipes: any[] = [];
  let newReadyRecipes: any[] = [];
  let newMissingRecipes: any[] = [];

  const apiResponse = await fetch(
    `https://us-central1-recipict-gcp.cloudfunctions.net/function-spoonacular-recipe-by-ingredient`,
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

    const instructions = analyzedInstructions[0].steps.map((stepInfo: any) => {
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
        unit: ingredient.unit == "" ? "pc" : ingredient.unit,
        original: ingredient.originalName,
      };
    });

    const recipe = {
      title,
      summary,
      instructions,
      missedIngredientCount,
      id,
      readyInMinutes,
      totalIngredients,
      image,
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
  console.log("Fetching random recipes with REACT QUERY...");
  
  let newRecipes: any[] = [];

  const apiResponse = await fetch(
    `https://us-central1-recipict-gcp.cloudfunctions.net/function-random-recipe`,
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

    const instructions = analyzedInstructions[0].steps.map((stepInfo: any) => {
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

    newRecipes.push({
      title,
      summary,
      instructions,
      missedIngredientCount,
      id,
      readyInMinutes,
      totalIngredients,
      image,
    });
  });

  return { newRecipes };
}
