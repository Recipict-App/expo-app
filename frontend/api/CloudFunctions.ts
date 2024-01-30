export async function ClassifyCategory (ingredientName: string) {
    const CategoryResponse = await fetch(
      `https://us-central1-recipict-gcp.cloudfunctions.net/function-ingredient-classifier-py?name=${ingredientName}`,
      {
        method: "GET",
        mode: "cors",
      }
    );

    const data = await CategoryResponse.json();
    return data.category;
}

