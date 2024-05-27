/* eslint-disable */
import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { UserRecord } from "firebase-admin/auth";

const admin = require("firebase-admin");
const auth_functions = require("firebase-functions/v1/auth");
const pubsub_functions = require("firebase-functions/v1/pubsub");

// * API KEYS

const SPOONACULAR_API_KEY = "fe291eb222404e7ab4b7858023ff1d90";


// * Initialization

admin.initializeApp({
  projectId: "recipict-dev-gcp",
});


// * ONREQUEST FUNCTIONS

export const recipe_by_ingredients = onRequest(async (req, res) => {
  const ingredientsString = req.body.ingredients;
  const recipeAmount = req.body.subscription == true ? 24 : 12;
  const mode = req.body.mode === "ready" ? "max-used-ingredients" : "min-missing-ingredients";
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


// * EVENT-BASED FUNCTIONS

exports.create_user_event = auth_functions.user().onCreate((user: UserRecord) => {
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

exports.decrement_expiry_date_everyday = pubsub_functions.schedule('every day 00:00').onRun(async (context: any) => {
  try {
    // Fetch all users
    const usersSnapshot = await admin.firestore().collection('users').get();
    const userDocs = usersSnapshot.docs;

    // Process each user document
    const promises = userDocs.map(async (userDoc: any) => {
      const userData = userDoc.data();

      // Check if the user has ingredients
      if (Array.isArray(userData.ingredients) && userData.ingredients.length > 0) {
        const updatedIngredients = userData.ingredients.map((ingredient: any) => {
          // Decrement daysBeforeExpired
          return {
            ...ingredient,
            daysBeforeExpired: ingredient.daysBeforeExpired > 0 ? ingredient.daysBeforeExpired - 1 : 0,
          };
        });

        // Update user document with the new ingredients array
        await admin.firestore().collection('users').doc(userDoc.id).update({
          ingredients: updatedIngredients,
        });
      }
    });

    // Wait for all promises to complete
    await Promise.all(promises);

    logger.log('Successfully decremented daysBeforeExpired for all users.');
  } catch (error) {
    logger.log('Error decrementing daysBeforeExpired:', error);
  }
});