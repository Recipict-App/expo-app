import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9QL6hYF1IKw779CKd-kwoXHbWAl5b1no",
  authDomain: "recipict-gcp.firebaseapp.com",
  projectId: "recipict-gcp",
  storageBucket: "recipict-gcp.appspot.com",
  messagingSenderId: "746895610022",
  appId: "1:746895610022:web:32cbd034dca7a5bbbce467",
  measurementId: "G-VQKW77EWKJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
