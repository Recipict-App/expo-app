/* eslint-disable */
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

import { UserRecord } from "firebase-admin/auth";
const functions = require("firebase-functions/v1/auth");
const admin = require("firebase-admin");

const SPOONACULAR_API_KEY = "fe291eb222404e7ab4b7858023ff1d90";

admin.initializeApp({
  projectId: "recipict-dev-gcp",
});



/* ONREQUEST FUNCTIONS */

export const hello_world = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

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



/* EVENT-BASED FUNCTIONS */

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
