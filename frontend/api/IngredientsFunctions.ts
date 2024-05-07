import { ingredientProps } from "../firebase-type";
import * as Crypto from "expo-crypto";

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


  // const data = await AssignPropertiesToIngredient(rawData);
  // const items = data.items;

  // return items;
}



/* Helpers */

// async function AssignPropertiesToIngredient(rawData: any): Promise<{
//   items: ingredientProps[];
// }> {
//   const items: ingredientProps[] = await Promise.all(
//     rawData.document.entities.map(async (item: any) => {
//       let date = "";
//       let product_code = "";
//       let product_name = "";
//       let product_quantity = "1";
//       let quantity_unit = "";

//       // Assign category for each item
//       if (item.type == "date") {
//         date = item.mentionText;
//       } else if (item.type == "item_name") {
//         // get the item properties
//         item.properties.forEach((property: any) => {
//           if (property.type == "product_code")
//             product_code = property.mentionText;
//           if (property.type == "product_name")
//             product_name = property.mentionText;
//           if (property.type == "product_quantity")
//             product_quantity = property.mentionText;
//         });

//         // check if product_quantity contains 'kg'
//         const containsLetter = /[a-zA-Z]/.test(product_quantity);
//         if (containsLetter) {
//           // extract the unit from product_quantity
//           quantity_unit = product_quantity.match(/[a-zA-Z]+/)?.[0] || "";
//           // remove all letters from product_quantity
//           product_quantity = product_quantity.replace(/[a-zA-Z]/g, "");
//         }

//         // todo: do something with product_code

//         // call helper to get category for each item
//         const {category, expiration, generic_name} = await getIngredientProperties(product_name);
//         // console.log('-----------------');
//         // console.log(category);
//         // console.log(Number(expiration));
//         // console.log(generic_name);
//         // console.log('-----------------');
        
//         // create json object based on date
//         if (date) {
//           return {
//             name: product_name,
//             quantity: product_quantity,
//             unit: quantity_unit || "pc",
//             expiryDate: new Date(
//               new Date().getTime() + Number(expiration) * 24 * 60 * 60 * 1000
//             ),
//             dateAdded: date,
//             type: category,
//             id: Crypto.randomUUID(),
//             genericName: generic_name,
//           };
//         } else {
//           return {
//             name: product_name,
//             quantity: product_quantity,
//             unit: quantity_unit || "pc",
//             expiryDate: new Date(
//               new Date().getTime() + Number(expiration) * 24 * 60 * 60 * 1000
//             ),
//             dateAdded: new Date(),
//             type: category,
//             id: Crypto.randomUUID(),
//             genericName: generic_name,
//           };
//         }
//       }
//     })
//   );

//   const filteredItems: ingredientProps[] = items.filter(
//     (item: any) => item !== undefined
//   );

//   // create a new object
//   const itemsJSON = { items: filteredItems };

//   return itemsJSON;
// }


// export async function getIngredientProperties(ingredientName: string): Promise<{
//   category: String;
//   expiration: String;
//   generic_name: String;
// }> {
//   // input validation
//   if (!ingredientName) throw new Error("Invalid ingredient name");

//   // call the api
//   let assign_ingredient_properly_url = process.env.EXPO_CF_DOCAI_API || "";
//   if (!assign_ingredient_properly_url) throw new Error("assign_ingredient_properly_url not found");
//   assign_ingredient_properly_url = assign_ingredient_properly_url +  '?name=' + ingredientName;


//   const response = await fetch(
//     assign_ingredient_properly_url,
//     {
//       method: "GET",
//       mode: "cors",
//     }
//   );

//   // check for errors
//   if (!response.ok)
//     throw new Error(
//       `HTTP error when analyzing ingredient! status: ${response.status}`
//     );

//   // return the category
//   const data = await response.json();

//   return data;
// }
