// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // --- 1. IMPORTA getAuth ---

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhsnlLEGroETtC59bO0GQLrKMzenYdZRs",
  authDomain: "dolaraldianew.firebaseapp.com",
  projectId: "dolaraldianew",
  storageBucket: "dolaraldianew.firebasestorage.app",
  messagingSenderId: "318589832220",
  appId: "1:318589832220:web:678d50ee2fd1076f4fe3d9",
  measurementId: "G-18KWN5FHKX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// --- 2. INICIALIZA Y EXPORTA auth ---
export const auth = getAuth(app); 