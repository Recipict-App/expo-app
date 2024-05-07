/* eslint-disable */
import { onRequest } from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";
import { UserRecord } from "firebase-admin/auth";
import { v4 as uuidv4 } from "uuid";

const { DocumentProcessorServiceClient } =
require("@google-cloud/documentai").v1;
// const aiplatform = require("@google-cloud/aiplatform");
const admin = require("firebase-admin");
const functions = require("firebase-functions/v1/auth");

// * API KEYS

const SPOONACULAR_API_KEY = "fe291eb222404e7ab4b7858023ff1d90";
const projectId = "recipict-dev-gcp";
const DocAI_locationId = "us";
const DocAI_processorId = "93c825aa3842bef3";

// * Initialization

admin.initializeApp({
  projectId: "recipict-dev-gcp",
});
const DocAI_client = new DocumentProcessorServiceClient();

// * ONREQUEST FUNCTIONS

export const recipe_by_ingredients = onRequest(async (req, res) => {
  const ingredientsString = req.body.ingredients;
  const recipeAmount = req.body.subscription == true ? 24 : 12;
  const mode =
    req.body.mode === "ready"
      ? "max-used-ingredients"
      : "min-missing-ingredients";
  const cuisinesString = req.body.cuisines || "";
  const dietsString = req.body.diets || "";
  const equipmentsString = req.body.equipments || "";

  const apiEndpoint = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&number=${recipeAmount}&includeIngredients=${ingredientsString}&cuisine=${cuisinesString}&sort=${mode}&equipment=${equipmentsString}&diet=${dietsString}&instructionsRequired=true&addRecipeInformation=true&fillIngredients=true&ignorePantry=true&limitLicense=true`;

  const apiResponse = await fetch(apiEndpoint);
  const result = await apiResponse.json();

  res.status(200).json(result);
});

export const recipe_by_random = onRequest(async (req, res) => {
  const recipeAmount = req.body.subscription == true ? 24 : 12;
  const cuisinesString = req.body.cuisines || "";
  const dietsString = req.body.diets || "";
  let includeTags = dietsString || cuisinesString;
  if (dietsString && cuisinesString) {
    includeTags = `${dietsString},${cuisinesString}`;
  }

  const apiEndpoint = `https://api.spoonacular.com/recipes/random?apiKey=${SPOONACULAR_API_KEY}&number=${recipeAmount}&include-tags=${includeTags}&instructionsRequired=true&addRecipeInformation=true&fillIngredients=true&limitLicense=true`;

  const apiResponse = await fetch(apiEndpoint);
  const result = await apiResponse.json();

  res.status(200).json(result);
});

export const receipt_extractor_api = onRequest(async (req, res) => {
  const base64ImageData = req?.body?.base64ImageData;

  const document_ai_request_body = {
    name: `projects/${projectId}/locations/${DocAI_locationId}/processors/${DocAI_processorId}`,
    rawDocument: {
      content: base64ImageData,
      mimeType: "image/jpeg",
    },
    // fieldMask: "date"
  };

  let document_ai_result;

  try {
    // suprisingly, the line below return a list, and we need the first element
    document_ai_result = await DocAI_client.processDocument(
      document_ai_request_body
    );
    // res.status(200).json(document_ai_result);
  } catch (error: any) {
    res.status(500).send(error.message);
  }

  /* ------- GET EXTRACTED DATA AND OBJECTIFY IT -------- */

  const extractProperties = (properties: any[]) => {
    let product_code = "";
    let product_name = "";
    let product_quantity = "1";

    properties.forEach((property: any) => {
      if (property.type == "product_code") product_code = property.mentionText;
      if (property.type == "product_name") product_name = property.mentionText;
      if (property.type == "product_quantity")
        product_quantity = property.mentionText;
    });

    return { product_code, product_name, product_quantity };
  };

  const extractQuantityAndUnit = (product_quantity: string) => {
    const containsLetter = /[a-zA-Z]/.test(product_quantity);
    let quantity_unit = "";

    if (containsLetter) {
      quantity_unit = product_quantity.match(/[a-zA-Z]+/)?.[0] || "";
      product_quantity = product_quantity.replace(/[a-zA-Z]/g, "");
    }

    return { product_quantity, quantity_unit };
  };



  let receipt_date = "";
  const items: any[] = await Promise.all(
    document_ai_result[0].document.entities.map(async (item: any) => {
      if (item.type === "date") {
        receipt_date = item.mentionText;
        return;
      }

      const {
        product_code,
        product_name,
        product_quantity: raw_product_quantity,
      } = extractProperties(item.properties);
      const { product_quantity, quantity_unit } =
        extractQuantityAndUnit(raw_product_quantity);

      // const { category, expiration, generic_name } = await getIngredientProperties(product_name);
      const { category, expiration, generic_name } = {
        category: "test",
        expiration: 0,
        generic_name: "test",
      };

      return {
        name: product_name,
        quantity: product_quantity,
        unit: quantity_unit || "pc",
        expiryDate: new Date(
          new Date().getTime() + Number(expiration) * 24 * 60 * 60 * 1000
        ),
        dateAdded: receipt_date || new Date(),
        type: category,
        id: uuidv4(),
        genericName: generic_name,
        productCode: product_code,
      };
    })
  );

  const filteredItems: any[] = items.filter((item: any) => item !== undefined);

  // create a new object
  res.status(200).json({ items: filteredItems });
});

// * HELPER FUNCTIONS

// export const get_ingredient_property = onRequest(async (req, res) => {
//   const name = req?.body?.name || req?.query?.name;
//   if (!name) {
//     res.status(401).json({
//       category: "missing property",
//       expiration: 0,
//       generic_name: "missing property",
//     });
//   }

//   const { PredictionServiceClient } = aiplatform.v1;
//   const { helpers } = aiplatform;

//   const clientOptions = {
//     apiEndpoint: "us-central1-aiplatform.googleapis.com",
//   };
//   const publisher = "google";
//   const model = "text-bison@002";

//   // Instantiates a client
//   const predictionServiceClient = new PredictionServiceClient(clientOptions);

//   // Configure the parent resource
//   const endpoint = `projects/${projectId}/locations/${DocAI_locationId}/publishers/${publisher}/models/${model}`;

//   const prompt = `
//   Provide answers for the following questions based on the given object. Seperate each answer with comma in given question order.
      
//   1. What is the category of the object? Choices: Vegetables, Fruits, Liquids, Grains, Meats, Dairy, Seafood, Herbs & spices, Seeds, Oils, Condiments, or Not ingredients. Only answer the category of the object, nothing else.
//   2. What is the most likely duration of expiration, measured in days, for the given object? Choices: 1, 2, 3, 4, 5, 6, 7, 10, 14, 21, 30, 60, 90, 180, 365. Only answer the number, nothing else.
//   3. What is the generic name of the given grocery product name, excluding brand, code, or punctuation marks. Only answer the generic name, nothing else.

//   input: ${name}
//   output:
// `;

//   const instanceValue = helpers.toValue(prompt);
//   const instances = [instanceValue];

//   const parameter = {
//     temperature: 0.0,
//     maxOutputTokens: 128,
//     topP: 0.95,
//     topK: 40,
//   };
//   const parameters = helpers.toValue(parameter);

//   const request = {
//     endpoint,
//     instances,
//     parameters,
//   };

//   // Predict request
//   const response = await predictionServiceClient.predict(request);
//   console.log("Get text prompt response");
//   console.log(response);

//   logger.log("raw response: ", response);

//   const data = response.outputs[0].content.stringVal[0];

//   logger.log("digged response: ", data);

//   const result_list = data.text.split(",");
//   const result = {
//     category: result_list[0].trim(),
//     expiration: result_list[1].trim(),
//     generic_name: result_list[2].trim(),
//   };

//   res.status(200).json(result);
// });

// * EVENT-BASED FUNCTIONS

exports.create_user_event = functions.user().onCreate((user: UserRecord) => {
  const new_user_data = {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    metadata: user.metadata,
    photoURL: user.photoURL,
    ingredients: [],
    cuisines: [],
    diets: [],
    subscription: false,
  };

  return admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .set(JSON.parse(JSON.stringify(new_user_data)));
});
