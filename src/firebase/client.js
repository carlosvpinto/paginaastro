// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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