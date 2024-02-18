export async function getRecommendedRecipes(
  requestBody: any,
  setRecipes: React.Dispatch<any>,
  setReadyRecipes: React.Dispatch<any>,
  setMissingRecipes: React.Dispatch<any>
) {
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

  let newRecipes: any[] = [];
  let newReadyRecipes: any[] = [];
  let newMissingRecipes: any[] = [];

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

    if (missedIngredientCount == 0) {
      newReadyRecipes.push({
        title,
        summary,
        instructions,
        missedIngredientCount,
        id,
        readyInMinutes,
        totalIngredients,
        image,
      });
    } else {
      newMissingRecipes.push({
        title,
        summary,
        instructions,
        missedIngredientCount,
        id,
        readyInMinutes,
        totalIngredients,
        image,
      });
    }

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

  setRecipes(newRecipes);
  setReadyRecipes(newReadyRecipes);
  setMissingRecipes(newMissingRecipes);

  console.log("Recommended Recipes Loaded 🥰");
}

export async function getRandomRecipes(
  requestBody: any,
  setRandomRecipes: React.Dispatch<any>
) {
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
  let newRecipes: any[] = [];

  const result = await apiResponse.json();
  result.recipes.map((recipeInfo: any) => {
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
      // console.log(stepInfo);
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
    newRecipes = [
      ...newRecipes,
      {
        title,
        summary,
        instructions,
        missedIngredientCount,
        id,
        readyInMinutes,
        totalIngredients,
        image,
      },
    ];
  });
  setRandomRecipes(newRecipes);
  console.log("Random Recipes Loaded 🥹");
}

/* Migrating to react query */

export async function fetchRecommendedRecipes(requestBody: any) {
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

    if (missedIngredientCount == 0) {
      newReadyRecipes.push({
        title,
        summary,
        instructions,
        missedIngredientCount,
        id,
        readyInMinutes,
        totalIngredients,
        image,
      });
    } else {
      newMissingRecipes.push({
        title,
        summary,
        instructions,
        missedIngredientCount,
        id,
        readyInMinutes,
        totalIngredients,
        image,
      });
    }

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

  console.log("Recommended Recipes Loaded 🥰");
  return { newRecipes, newReadyRecipes, newMissingRecipes };
}
