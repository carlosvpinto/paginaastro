// src/stores/authStore.js
import { persistentAtom } from '@nanostores/persistent';

// Creamos un "átomo" persistente.
// 'isLoggedIn' es el nombre de la variable.
// 'auth' es la clave que usará en el localStorage del navegador.
// false es el valor inicial.
export const isLoggedIn = persistentAtom('auth', false);