import { initializeApp, getApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAaCF5n-HW8mqnY6UAdFLAgDB6AGALN408",
  authDomain: "recipict-dev-gcp.firebaseapp.com",
  projectId: "recipict-dev-gcp",
  storageBucket: "recipict-dev-gcp.appspot.com",
  messagingSenderId: "719179759408",
  appId: "1:719179759408:web:e5dba8a10e523f325e52f5",
  measurementId: "G-F98KJCM8C5"
};

export function initializeServices() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  return { app, auth, firestore };
}


// const analytics = getAnalytics(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
