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

admin.initializeApp({
  projectId: "recipict-dev-gcp"
});

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

/* EVENT-BASED FUNCTIONS */

exports.createUser = functions.user().onCreate((user: UserRecord) => {
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
  }

  return admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .set(JSON.parse(JSON.stringify(new_user_data)));
});
