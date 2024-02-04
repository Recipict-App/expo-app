import { ingredientProps } from "../firebase-type";
import * as Crypto from "expo-crypto";

export async function ImageToItems(
  base64ImageData: string
): Promise<ingredientProps[]> {
  // create the request body
  const requestBody = {
    base64ImageData: base64ImageData,
  };

  const response = await fetch(
    "https://us-central1-recipict-gcp.cloudfunctions.net/function-document-ai-api",
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
  );

  // check for errors
  if (!response.ok) {
    throw new Error(
      `HTTP error when parsing image! status: ${response.status}`
    );
  }

  // parse the response
  const rawData = await response.json();
  const data = await AssignProperiesToIngredient(rawData);
  const items = data.items;

  return items;
}

export async function ClassifyCategory(
  ingredientName: string
): Promise<string> {
  // input validation
  if (!ingredientName) throw new Error("Invalid ingredient name");

  // call the api
  const response = await fetch(
    `https://us-central1-recipict-gcp.cloudfunctions.net/function-ingredient-classifier-py?name=${ingredientName}`,
    {
      method: "GET",
      mode: "cors",
    }
  );

  // check for errors
  if (!response.ok)
    throw new Error(
      `HTTP error when classifying ingredient! status: ${response.status}`
    );

  // return the category
  const data = await response.json();

  return data.category;
}

/* Helpers */

async function AssignProperiesToIngredient(rawData: any): Promise<{
  items: ingredientProps[];
}> {
  const items: ingredientProps[] = await Promise.all(
    rawData.document.entities.map(async (item: any) => {
      let date = "";

      // Assign category for each item
      if (item.type == "date") {
        date = item.mentionText;
      } else if (item.type == "item_name") {
        // call helper to get category for each item
        const category = await ClassifyCategory(item.mentionText);

        // create json object based on date
        if (date) {
          return {
            name: item.mentionText,
            quantity: 1,
            unit: "gr",
            expiryDate: date,
            dateAdded: date,
            type: category,
            id: Crypto.randomUUID(),
          };
        } else {
          return {
            name: item.mentionText,
            quantity: 1,
            unit: "gr",
            expiryDate: "Not Added",
            dateAdded: new Date(),
            type: category,
            id: Crypto.randomUUID(),
          };
        }
      }
    })
  );

  const filteredItems: ingredientProps[] = items.filter(
    (item: any) => item !== undefined
  );

  // create a new object
  const itemsJSON = { items: filteredItems };

  return itemsJSON;
}
