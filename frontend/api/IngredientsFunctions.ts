import { ingredientType } from "../types/firebase-type";
import * as Crypto from "expo-crypto";

export async function ImageToItems(base64ImageData: string): Promise<ingredientType[]> {
  // create the request body
  const requestBody = {
    base64ImageData: base64ImageData,
  };
  // const openai_api_url = process.env.EXPO_CF_DOCAI_API || "";
  const openai_api_url = process.env.EXPO_CF_OPENAI_API || "";
  if (!openai_api_url) throw new Error("openai_api_url not found");

  const response = await fetch(openai_api_url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  // check for errors
  if (!response.ok) {
    throw new Error(`HTTP error when parsing image! status: ${response.status}`);
  }

  // parse the response
  const data = await response.json();
  // console.log(data.choices[0].message.content);
  // console.log(typeof data.choices[0].message.content);

  const jsonString = data.choices[0].message.content.replace(/^```json\s+/, "").replace(/\s+```$/, "");
  const jsonResponse = JSON.parse(jsonString);

  // console.log(typeof jsonResponse);

  // assign unique to each ingredient
  const ingredients = jsonResponse.ingredients.map((ingredient: any, index: number) => {
    if (ingredient.dateAdded === "") {
      ingredient.dateAdded = new Date().toISOString().split('T')[0];
    }
    return {
      ...ingredient,
      id: Crypto.randomUUID(),
    };
  });

  console.log(`Number of ingredients scanned: ${ingredients.length} `);

  return ingredients;
}
