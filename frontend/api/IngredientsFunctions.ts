import { ingredientProps } from "../types/firebase-type";


export async function ImageToItems(
  base64ImageData: string
): Promise<ingredientProps[]> {
  // create the request body
  const requestBody = {
    base64ImageData: base64ImageData,
  };
  const documentai_api_url = process.env.EXPO_CF_DOCAI_API || "";
  if (!documentai_api_url) throw new Error("documentai_api_url not found");

  const response = await fetch(
    documentai_api_url,
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
  const data = await response.json();
  console.log(data);
  return data.items;
}