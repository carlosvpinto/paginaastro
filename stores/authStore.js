// src/stores/authStore.js
import { atom } from 'nanostores';
// El 'átomo' que contiene el estado. Por defecto, el usuario no está logueado.
export const isLoggedIn = atom(false);
// Función para intentar hacer login. Si tiene éxito, actualiza el estado.
export function attemptLogin(username, password) {
if (username === 'desoftsis' && password === '12345') {
isLoggedIn.set(true); // Actualiza el estado a 'logueado'
return true; // Devuelve éxito
}
return false; // Devuelve fracaso
}