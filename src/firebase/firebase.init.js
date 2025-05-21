// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBReWGUjyZJStUfyeT-OMcjdKqMlz_cjZk",
  authDomain: "coffee-store-app-e9435.firebaseapp.com",
  projectId: "coffee-store-app-e9435",
  storageBucket: "coffee-store-app-e9435.firebasestorage.app",
  messagingSenderId: "817249649001",
  appId: "1:817249649001:web:cf891311421999d36afdf8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);