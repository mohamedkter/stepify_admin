// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC0y87u6f9smxJZm-m3bUDdezmQp0oenzU",
  authDomain: "stepify-7490d.firebaseapp.com",
  projectId: "stepify-7490d",
  storageBucket: "stepify-7490d.firebasestorage.app",
  messagingSenderId: "139047892156",
  appId: "1:139047892156:web:ebb085a9a2ede8e0284cb9",
  measurementId: "G-BQ675L5BQT"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

console.log("Firebase app initialized:", app.name); // Log the app name to confirm initialization

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Storage
//const storage = getStorage(app);

// Initialize Analytics (optional)
//const analytics = getAnalytics(app);

export { app, db };
