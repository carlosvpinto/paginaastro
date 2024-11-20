// Importa las funciones necesarias
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDunoni4LR24FK-UrPAjG1HxO2jIlSaJZY",
  authDomain: "dolar-venezuela-9ec0a.firebaseapp.com",
  projectId: "dolar-venezuela-9ec0a",
  storageBucket: "dolar-venezuela-9ec0a.appspot.com",
  messagingSenderId: "205325179040",
  appId: "1:205325179040:web:05474d14e8c48f6fbad1c5",
  measurementId: "G-27NVM4S2DW",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Analytics solo si es compatible
let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
    console.log("Analytics inicializado correctamente.");
  } else {
    console.warn("Firebase Analytics no es compatible con este entorno.");
  }
});

export { app, analytics };
